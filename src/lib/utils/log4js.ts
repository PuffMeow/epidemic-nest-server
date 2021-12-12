import * as path from 'path';
import * as Log4js from 'log4js';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import dayjs from 'dayjs';
import Util from 'util';
import { ICreateLogParams, LoggerLevel } from '@/types/log4js';
import log4jsConfig from '@/config/log4js';

// 内容跟踪
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: string,
    public readonly columnNumber?: string,
  ) {}
}

Log4js.addLayout('epidemic-server', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';

    //日志组装
    const messageList: string[] = [];

    for (let value of logEvent.data) {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }

        return;
      }
      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    }

    // 日志组成部分
    const messageOutput = messageList.join(' ');
    const positionOutput = position ? ` [${position}]` : '';
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${dayjs(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput = moduleName ? `[${moduleName}] ` : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }
    return `${Chalk.green(typeOutput)}-${dateOutput}-
     ${Chalk.yellow(moduleOutput)}-${levelOutput}-${positionOutput}`;
  };
});

Log4js.configure(log4jsConfig);

// 实例化
const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args: any[]) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args: any[]) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args: any[]) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args: any[]) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args: any[]) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args: any[]) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args: any[]) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args: any[]) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args: any[]) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber = stackInfo.lineNumber;
    const columnNumber = stackInfo.columnNumber;
    const fileName = stackInfo.fileName;
    const basename = path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}

export function createLogInfo(params: ICreateLogParams): string {
  return ` Request original url: ${params.url}
  Method: ${params.method}
  IP: ${params.ip}
  Status code: ${params?.code || ''}
  Parmas: ${JSON.stringify(params?.params || '')}
  Query: ${JSON.stringify(params?.query || '')}
  Body: ${JSON.stringify(params?.body || '')}
  Response: ${JSON.stringify(params?.response || '')}
  Exception: ${JSON.stringify(params?.exception) || ''}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
}
