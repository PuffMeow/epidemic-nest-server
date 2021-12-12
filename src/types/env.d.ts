// 定义.env 文件中的数据类型
namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    ALI_APP_KEY: string; // 阿里云疫情接口 AppKey
    ALI_APP_SECRET: string; // 阿里云疫情接口 AppSecret
    [key: string]: any;
  }
}
