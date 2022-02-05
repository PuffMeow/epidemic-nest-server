import configuration from '@/config/configuration';
import axios from 'axios';

export async function getBaiduToken() {
  const res = await axios.get(
    `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${configuration.baiduApiKey}&client_secret=${configuration.baiduApiSecret}`,
  );

  return res?.data?.access_token;
}
