import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { TokenExpiredError } from "@nestjs/jwt";

@Catch(TokenExpiredError)
export class TokenExpiredExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: TokenExpiredError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    console.log("exception: ", JSON.stringify(exception));
    console.log("expiredAt: ", exception?.expiredAt);
    console.log("inner: ", exception?.inner);
    console.log("message: ", exception?.message);
    console.log("name: ", exception?.name);
    console.log("stack: ", exception?.stack);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message ? exception.message : exception;

    if (exception instanceof TokenExpiredError) message = exception.message;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: `${httpAdapter.getRequestUrl(ctx.getRequest())}`,
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
