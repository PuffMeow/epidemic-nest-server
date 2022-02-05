import { Logger } from '@/lib/utils/log4js';
import { removeKeyInObject } from '@/lib/utils/utils';
import axios from 'axios';
import CacheService from '@/service/tools/redisService';
import { Injectable } from '@nestjs/common';
import { getBaiduToken } from '@/lib/utils/request';

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

      const res = await axios({
        url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
        method: 'GET',
      });

      if (!res?.data) {
        return null;
      }

      const data = JSON.parse(res.data.data);

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

      const result = {
        lastUpdateTime: data.lastUpdateTime,
        chinaAdd: data.chinaAdd,
        chinaTotal: data.chinaTotal,
        todayProvinceData,
        nowConfirmProvinceData,
        totalProvinceData,
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
}
