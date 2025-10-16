import passport from "passport";

import {
  JsonWebTokenExceptionFilter,
  TokenExpiredExceptionFilter,
} from "@nauijohn/docker_microservices_common";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

export function config(app: INestApplication<any>): void {
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new TokenExpiredExceptionFilter(httpAdapter),
    new JsonWebTokenExceptionFilter(httpAdapter),
  );

  app.use(passport.initialize());
}
