import * as path from 'path';
import { Configuration } from 'log4js';
const baseSaveLogPath = path.resolve(__dirname, '../../logs');

// 文件保存天数
const DAYS_TO_KEEP = 7;

const log4jsConfig: Configuration = {
  appenders: {
    console: {
      type: 'console', // 打印到控制台
    },
    access: {
      type: 'dateFile', // 会写入文件，并按照日期分类
      filename: `${baseSaveLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      daysToKeep: DAYS_TO_KEEP,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseSaveLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      daysToKeep: DAYS_TO_KEEP,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseSaveLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyy-MM-dd',
      daysToKeep: DAYS_TO_KEEP,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['app', 'errors'], level: 'info' },
    access: { appenders: ['app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true, // 使用 pm2 来管理项目时打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;
