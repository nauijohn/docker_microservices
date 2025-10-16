import { CommonLibModule } from "@nauijohn/docker_microservices_common";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { RefreshTokensModule } from "../refresh-tokens";
import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { RefreshTokenStrategy } from "./refresh-token.strategy";

@Module({
  imports: [
    CommonLibModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRES_IN"),
        },
      }),
    }),
    UsersModule,
    RefreshTokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
