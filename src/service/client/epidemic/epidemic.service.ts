import { aliGatewayRequest } from '@/lib/requests/ali-gateway-api';
import { Logger } from '@/lib/utils/log4js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EpidemicService {
  async getEpidemicData() {
    try {
      const url =
        'https://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend';
      const res = await aliGatewayRequest({
        url,
        method: 'get',
        appKey: process.env.ALI_APP_KEY,
        appSecret: process.env.ALI_APP_SECRET,
      });

      return res;
    } catch (e) {
      Logger.error(e);
    }
  }
}
