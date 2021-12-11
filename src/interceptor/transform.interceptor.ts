import { createLogInfo, Logger } from '@/lib/utils/log4js';
import { IResponse } from '@/types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    const req: Request = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map(data => {
        const logFormat = createLogInfo({
          method: req.method,
          ip: req.ip,
          params: req.params,
          query: req.query,
          body: req.body,
          url: req.originalUrl,
          response: data,
        });

        Logger.access(logFormat);
        return {
          data,
          statusCode: 200,
          message: '请求成功',
          success: true,
        };
      }),
    );
  }
}
