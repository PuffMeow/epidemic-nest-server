import { createLogInfo, Logger } from '@/lib/utils/log4js';
import { Request, Response } from 'express';

export function logger(req: Request, res: Response, next: () => void) {
  const code = res.statusCode;
  next();

  // 组装日志信息
  const logFormat = createLogInfo({
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    params: req.params,
    query: req.query,
    body: req.body,
  });

  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
