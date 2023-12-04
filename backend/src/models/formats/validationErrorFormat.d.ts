interface ResValidateErrorFormat {
  count: number;
  error: ValidateErrorFormat;
}
interface ValidateErrorFormat {
  [error: number]: ErrorFormat;
}
interface ErrorFormat {
  error_code: string;
  message: string;
}

export { ResValidateErrorFormat, ValidateErrorFormat, ErrorFormat };
