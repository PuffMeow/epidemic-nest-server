// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export interface ICreateLogParams {
  ip: string;
  method: string;
  url: string;
  code?: number;
  query?: any;
  params?: any;
  body?: any;
  response?: any;
}
