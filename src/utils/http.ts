export class HttpResult {
  data: any;
  message: string;
  fields?: object;

  constructor(message: string, data: any, fields?: object) {
    this.message = message;
    this.data = data;
    this.fields = fields;
  }
}
