export default class ApiException extends Error {
  status: number;
  data: unknown;
  url: string;

  constructor(message: string, status: number, data: unknown, url: string) {
    super(message);
    this.name = "ApiException";
    this.status = status;
    this.data = data;
    this.url = url;
  }
}