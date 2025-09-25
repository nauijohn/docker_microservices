import { CommonLibModule } from "@nauijohn/docker_microservices_common";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CommonLibModule.jwt.register({
      secret: "secretKey",
      signOptions: { expiresIn: "60m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
