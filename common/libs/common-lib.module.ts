import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { JwtAuthGuard } from "./guards";
import { JwtStrategy } from "./strategies";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class CommonLibModule {}
