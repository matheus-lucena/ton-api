export class HttpResult {
  data: any;
  message: string;

  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}
