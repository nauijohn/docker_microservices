import { Observable } from "rxjs";

import { ExecutionContext, Injectable } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

import { JwtUser } from "../strategies";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtUser>(
    err: Error,
    user: TUser,
    info: unknown,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log("JWT HandleRequest Guard");

    console.log("err: ", err);
    console.log("status: ", status);
    console.log("user: ", user);

    if (info) {
      if (info instanceof JsonWebTokenError) {
        throw info;
      }

      if (!TokenExpiredError) {
        console.log("info: ", info);
      }
    }

    if (err) throw err;

    if (!user) throw new TokenExpiredError("Token expired", new Date());

    return user as TUser;
  }
}
