import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "topSecretKey",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy, JwtService],
  exports: [JwtModule, JwtAuthGuard, JwtStrategy, JwtService],
})
export class CommonLibModule {}
