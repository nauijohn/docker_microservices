import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { JwtStrategy } from "../../../common/libs/my-library/src/jwt.strategy";
import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "topSecretKey",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
