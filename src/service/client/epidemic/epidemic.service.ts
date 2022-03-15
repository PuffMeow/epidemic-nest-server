import { Logger } from '@/lib/utils/log4js';
import { removeKeyInObject, sortKeyForUrlQuery } from '@/lib/utils/utils';
import axios from 'axios';
import CacheService from '@/service/tools/redisService';
import * as md5 from 'md5';
import { Injectable } from '@nestjs/common';
import { getBaiduToken } from '@/lib/utils/request';
import configuration from '@/config/configuration';
import { ITrackDetail } from './type';
import { TrackDetailDto } from '@/dto';

@Injectable()
export class EpidemicService {
  constructor(private readonly cacheService: CacheService) {}

  /** 获取和处理疫情数据 */
  async getEpidemicData() {
    try {
      const cacheData = await this.cacheService.get('epidemicData');

      if (cacheData) {
        return cacheData;
      }

      const res = await Promise.all([
        // 基本疫情数据
        axios({
          url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
          method: 'GET',
        }),
        // 31 省市数据
        axios({
          method: 'POST',
          url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
        }),
        axios({
          url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList',
          method: 'GET',
        }),
      ]);

      if (
        !res?.[0]?.data?.data ||
        !res?.[1]?.data?.data ||
        !res?.[2]?.data?.data
      ) {
        return null;
      }

      const data = JSON.parse(res[0].data.data);

      const todayProvinceData = data.areaTree[0].children.map(item => {
        const {
          name,
          today: { confirm },
        } = item;
        return {
          name,
          value: confirm,
        };
      });

      const nowConfirmProvinceData = data.areaTree[0].children.map(item => {
        const { name, total } = item;
        removeKeyInObject(total, 'showRate');
        removeKeyInObject(total, 'showHeal');
        return {
          name,
          value: total.nowConfirm,
        };
      });

      const totalProvinceData = data.areaTree[0].children.map(item => {
        const { name, total } = item;
        removeKeyInObject(total, 'showRate');
        removeKeyInObject(total, 'showHeal');
        return {
          name,
          value: total.confirm,
        };
      });

      // 根据疫情新增数从高到低排序
      const epidemicProvinceList = res[1].data.data.statisGradeCityDetail.sort(
        (a, b) => b.confirmAdd - a.confirmAdd,
      );

      const localConfirmTrend = {
        xDay: [],
        yLocalConfirm: [],
      };

      const chinaDayList = res[2].data.data.chinaDayList;

      for (let idx = 0; idx < chinaDayList.length; idx += 5) {
        const item = chinaDayList[idx];
        localConfirmTrend.xDay.push(item.date);
        localConfirmTrend.yLocalConfirm.push(item.localConfirmH5);
      }

      localConfirmTrend.xDay.push(chinaDayList[chinaDayList.length - 1].date);
      localConfirmTrend.yLocalConfirm.push(
        chinaDayList[chinaDayList.length - 1].localConfirmH5,
      );

      const result = {
        lastUpdateTime: data.lastUpdateTime,
        chinaAdd: data.chinaAdd,
        chinaTotal: data.chinaTotal,
        todayProvinceData,
        nowConfirmProvinceData,
        totalProvinceData,
        epidemicProvinceList,
        localConfirmTrend,
      };

      if (result) {
        await this.cacheService.set('epidemicData', result, 60 * 60 * 2);
        return result;
      } else {
        return null;
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  /** 图片文字识别 */
  async OCRService(image: string) {
    let access_token: string = await this.cacheService.get('access_token');
    if (!access_token) {
      access_token = await getBaiduToken();

      await this.cacheService.set(
        'access_token',
        access_token,
        60 * 60 * 24 * 3,
      );
    }
    image = encodeURIComponent(image);
    const res = await axios({
      method: 'POST',
      // url: `https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis_office?access_token=${access_token}`,
      url: `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${access_token}`,
      data: `image=${image}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res?.data?.results;
  }

  async mapService(location: { latitude: number; longtitude: number }) {
    try {
      const sig = md5(
        '/ws/geocoder/v1/?' +
          sortKeyForUrlQuery(
            `https://apis.map.qq.com/ws/geocoder/v1/?location=${location.latitude},${location.longtitude}&key=${configuration.qqMapKey}`,
          ) +
          configuration.qqMapSecret,
      );

      const res = await axios({
        method: 'get',
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${location.latitude},${location.longtitude}&key=${configuration.qqMapKey}&sig=${sig}`,
      });

      if (!res?.data) {
        return null;
      }

      return res.data;
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async getTrackList({
    cityCode,
    cityName,
  }: {
    cityName: string;
    cityCode: string;
  }) {
    try {
      const cacheData = (await this.cacheService.get('trackList')) || {};

      if (cacheData && cacheData[cityCode]) {
        return cacheData[cityCode];
      }

      const res = await axios({
        method: 'get',
        url: 'https://i.snssdk.com/toutiao/normandy/pneumonia_trending/track_list/',
        params: {
          city_code: cityCode,
          city_name: cityName,
          activeWidget: 15,
          show_poi_list: 1,
        },
      });

      if (!res?.data?.data?.list) {
        return null;
      }

      const day7 = [];
      const day14 = [];

      const currentTime = Math.floor(+new Date() / 1000);
      res.data.data.list.forEach((item: ITrackDetail) => {
        const differDay = Math.floor(
          (currentTime - item.create_ts) / 24 / 60 / 60,
        );
        if (differDay <= 7) {
          day7.push(item);
        }
        if (differDay <= 14) {
          day14.push(item);
        }
      });

      const result = {
        day7,
        day14,
        all: res.data.data.list,
      };

      if (!cacheData[cityCode]) {
        cacheData[cityCode] = {};
      }

      cacheData[cityCode] = result;

      await this.cacheService.set('trackList', cacheData, 60 * 60 * 3);

      return result;
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async getTrackDetail({ poi, cityCode, cityName }: TrackDetailDto) {
    try {
      const res = await axios({
        url: 'https://i.snssdk.com/toutiao/normandy/pneumonia_trending/poi/',
        method: 'get',
        params: {
          city_code: cityCode,
          city_name: cityName,
          search_current_poi: poi,
          poi,
          activeWidget: 15,
          show_poi_list: 1,
        },
      });

      if (!res?.data?.data?.data) {
        return null;
      }
      return res.data.data.data;
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async codeRecognition(file: any) {
    let url = `https://wecqupt.oss-cn-chengdu.aliyuncs.com/${file.filename}`;
    let access_token: string = await this.cacheService.get('access_token');
    if (!access_token) {
      access_token = await getBaiduToken();

      await this.cacheService.set(
        'access_token',
        access_token,
        60 * 60 * 24 * 3,
      );
    }
    url = encodeURIComponent(url);
    const res = await axios({
      method: 'POST',
      // url: `https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis_office?access_token=${access_token}`,
      url: `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${access_token}`,
      data: `url=${url}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res?.data?.results;

    //   console.log(file);
    //   try {
    //     const worker = createWorker({
    //       logger: m => console.log(m),
    //     });

    //     await worker.load();
    //     await worker.loadLanguage('chi_sim');
    //     await worker.initialize('chi_sim');
    //     const {
    //       data: { text },
    //     } = await worker.recognize(
    //       `https://wecqupt.oss-cn-chengdu.aliyuncs.com/${file.filename}`,
    //     );
    //     console.log(text);
    //     await worker.terminate();
    //   } catch (e) {
    //     console.log(e);
    //   }
  }
}
