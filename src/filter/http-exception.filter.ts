import { createLogInfo, Logger } from '@/lib/utils/log4js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

interface IExceptionResponse {
  message: string;
}

/** 错误过滤器 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message =
      exception?.message || `${status >= 500 ? '服务端错误' : '客户端错误'}`;

    const errorResponse = {
      data: null,
      message: message,
      success: false,
      statusCode: status,
      exception: (exception.getResponse() as IExceptionResponse).message,
    };

    const logFormat = createLogInfo({
      method: req.method,
      ip: req.ip,
      url: req.originalUrl,
      code: status,
      response: errorResponse,
    });

    Logger.info(logFormat);
    res.status(status).json(errorResponse);
  }
}
