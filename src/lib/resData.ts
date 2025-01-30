export interface IMeta {
  statusCode: number;
  message: string;
  [key: string]: string | number | object;
}
export class ResData<TData> {
  meta: IMeta;

  constructor(
    statusCode: number,
    message: string,
    public data: TData | null = null,
    meta: Record<string, string | number | object> = {},
  ) {
    this.meta = {
      statusCode,
      message,
      ...meta,
    };
  }
}
