import { IResponse } from '@/types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    return next.handle().pipe(
      map(data => ({
        data,
        statusCode: 200,
        message: '请求成功',
        success: true,
      })),
    );
  }
}
