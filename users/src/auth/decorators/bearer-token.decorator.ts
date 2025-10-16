import { Request } from "express";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BearerToken = createParamDecorator(
  (data: unknown, context: ExecutionContext): string | null => {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    return authHeader.split(" ")[1];
  },
);
