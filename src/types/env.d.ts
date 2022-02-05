// 定义.env 文件中的数据类型
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'production' | 'development';
    MONGO_URL_DEV: string;
    MONGO_URL_PRO: string;
    REDIS_URL_DEV: string;
    REDIS_URL_PRO: string;
    JWT_SECRET: string; // JWT 的设置密钥
    BaiduApiKey: string;
    BaiduApiSecret: string;
    [key: string]: any;
  }
}
