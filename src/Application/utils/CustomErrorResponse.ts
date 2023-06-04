interface CustomErrorResponseProps {
  typeOfError:
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR";
  message: string;
  paramsErrors?: {
    property: string | number;
    error: string;
  }[];
  statusCode: number;
}

export class CustomErrorResponse extends Error {
  typeOfError:
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR";
  paramsErrors?: {
    property: string | number;
    error: string;
  }[];
  message: string;
  statusCode: number;

  constructor({
    typeOfError,
    message,
    statusCode = 500,
    paramsErrors,
  }: CustomErrorResponseProps) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
    this.typeOfError = typeOfError;
    this.paramsErrors = paramsErrors;
  }

  get_statusCode() {
    return this.statusCode;
  }

  get_objectOfResponse() {
    return {
      typeOfError: this.typeOfError,
      message: this.message,
      statusCode: this.statusCode,
      paramsErrors: this.paramsErrors,
    };
  }
}

export const defaultInternalServerError = new CustomErrorResponse({
  message: "internal server error",
  statusCode: 500,
  typeOfError: "INTERNAL_SERVER_ERROR",
});
