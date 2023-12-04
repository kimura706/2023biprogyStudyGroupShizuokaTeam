class ExpressError extends Error {
  statusCode: number;
  errorCode: string;
  constructor(message: string, statusCode: number, errorCode: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export { ExpressError };
