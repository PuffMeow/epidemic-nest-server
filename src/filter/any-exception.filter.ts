import { createLogInfo, Logger } from '@/lib/utils/log4js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      data: null,
      message: (exception as HttpException)?.message,
      success: false,
      statusCode: status,
    };

    const logFormat = createLogInfo({
      ip: req.ip,
      method: req.method,
      url: req.url,
      code: status,
      response: errorResponse,
      exception: exception,
    });
    Logger.error(logFormat);

    res.status(status).json(errorResponse);
  }
}
