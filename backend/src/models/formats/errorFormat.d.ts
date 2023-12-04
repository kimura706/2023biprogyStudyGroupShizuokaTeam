interface ErrorFormat {
  error: ErrorInfo;
}
interface ErrorInfo {
  message: string;
  errorCode: string;
}

export { ErrorFormat, ErrorInfo };
