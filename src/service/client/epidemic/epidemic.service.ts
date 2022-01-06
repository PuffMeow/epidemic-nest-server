import configuration from '@/config/configuration';
import { aliGatewayRequest } from '@/lib/requests/ali-gateway-api';
import { Logger } from '@/lib/utils/log4js';
import { removeKeyInObject } from '@/lib/utils/utils';
import CacheService from '@/service/tools/redisService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EpidemicService {
  constructor(private readonly cacheService: CacheService) {}
  async getEpidemicData() {
    try {
      const cacheData = await this.cacheService.get('epidemicData');

      if (cacheData !== null) {
        return cacheData;
      }
      const url =
        'https://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend';
      const res = await aliGatewayRequest({
        url,
        method: 'get',
        appKey: configuration.aliAppKey,
        appSecret: configuration.appSecret,
      });

      const proviceArr = res.provinceArray
        .map(item => ({
          name: item.childStatistic
            .replace('自治区', '')
            .replace('中国', '')
            .replace('省', '')
            .replace('维吾尔', '')
            .replace('壮族', '')
            .replace('回族', '')
            .replace('市', ''),
          value: {
            ...removeKeyInObject(item, 'childStatistic'),
          },
        }))
        .map(item => ({
          name: item.name,
          value: removeKeyInObject(item.value, 'cityArray'),
        }));

      const data = {
        contry: res.country,
        dataSourceUpdateTime: res.dataSourceUpdateTime,
        provinceArray: proviceArr,
      };

      if (data) {
        await this.cacheService.set('epidemicData', data, 60 * 1000 * 60 * 2);
        return data;
      } else {
        return null;
      }
    } catch (e) {
      Logger.error(e);
    }
  }
}
