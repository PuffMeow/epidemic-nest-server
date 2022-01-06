import * as env from 'dotenv';
env.config();

export const isDev = process.env.NODE_ENV === 'development';

const configuration = {
  port: process.env.PORT || 3000,
  mongoUrl: isDev ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PRO,
  redisUrl: isDev ? process.env.REDIS_URL_DEV : process.env.REDIS_URL_PRO,
  jwtSecret: process.env.JWT_SECRET,
  aliAppKey: process.env.ALI_APP_KEY,
  appSecret: process.env.ALI_APP_SECRET,
};

export default configuration;
