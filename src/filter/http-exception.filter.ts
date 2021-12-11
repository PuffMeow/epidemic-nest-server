import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/** 错误过滤器 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const message =
      exception?.message || `${status >= 500 ? '服务端错误' : '客户端错误'}`;

    const errorResponse = {
      data: null,
      message: message,
      success: false,
      statusCode: status,
    };

    response.status(status).json(errorResponse);
  }
}
