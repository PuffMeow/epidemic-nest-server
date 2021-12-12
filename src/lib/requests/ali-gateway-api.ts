const Client = require('aliyun-api-gateway').Client;

export async function aliGatewayRequest(params: {
  url: string;
  method: 'get' | 'post';
  appKey: string;
  appSecret: string;
  data?: Record<string, any>;
  headers?: Record<string, any>;
}) {
  const { url, method, appKey, appSecret, data = {}, headers = {} } = params;
  const client = new Client(appKey, appSecret);
  const result = await client[method](url, {
    data,
    headers,
  });

  return result;
}
