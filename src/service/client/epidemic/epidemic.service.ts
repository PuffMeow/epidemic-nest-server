import { Logger } from '@/lib/utils/log4js';
import { removeKeyInObject, sortKeyForUrlQuery } from '@/lib/utils/utils';
import axios from 'axios';
import CacheService from '@/service/tools/redisService';
import * as md5 from 'md5';
import { Injectable } from '@nestjs/common';
import { getBaiduToken } from '@/lib/utils/request';
import configuration from '@/config/configuration';

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
          method: 'post',
          url: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf',
        }),
      ]);

      if (!res?.[0]?.data?.data || !res?.[1]?.data?.data) {
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

      const result = {
        lastUpdateTime: data.lastUpdateTime,
        chinaAdd: data.chinaAdd,
        chinaTotal: data.chinaTotal,
        todayProvinceData,
        nowConfirmProvinceData,
        totalProvinceData,
        epidemicProvinceList,
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
      url: `https://aip.baidubce.com/rest/2.0/ocr/v1/doc_analysis_office?access_token=${access_token}`,
      data: `image=${image}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res?.data?.results;
  }

  async mapService(location: { latitude: number; longtitude: number }) {
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
  }
}
