import { Observable } from "rxjs";

import { ExecutionContext, Injectable } from "@nestjs/common";
import { TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

import { JwtUser } from "./jwt.strategy";

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
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log("JWT HandleRequest Guard");

    console.log("err: ", err);
    console.log("info: ", info);
    console.log("status: ", status);
    console.log("user: ", user);

    if (err) throw err;

    if (!user) throw new TokenExpiredError("Token expired", new Date());

    return user as TUser;
  }
}
