import { Request } from "express";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ReqUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Request["user"] | null => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user;

    if (!user) {
      return null;
    }

    return user;
  },
);
