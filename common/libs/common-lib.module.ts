import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [JwtModule],
  providers: [JwtAuthGuard, JwtStrategy, JwtService],
  exports: [JwtAuthGuard, JwtStrategy, JwtService],
})
export class CommonLibModule {
  static jwt = JwtModule;
}
