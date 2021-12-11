// 定义.env 文件中的数据类型
namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    [key: string]: any;
  }
}
