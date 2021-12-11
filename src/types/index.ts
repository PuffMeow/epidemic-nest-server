export interface IResponse<T = any> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
}
