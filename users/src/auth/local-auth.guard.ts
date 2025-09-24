import { Observable } from "rxjs";
import { User } from "src/users";

import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(
    err: Error,
    user: TUser,
    info: { message: string } | undefined,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log("info: ", info);
    console.log("status: ", status);

    if (err) throw err;

    if (!user) throw new InternalServerErrorException();

    return user;
  }
}
