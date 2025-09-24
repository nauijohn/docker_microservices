import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { MyLibraryService } from "./my-library.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "topSecretKey",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [MyLibraryService, JwtAuthGuard, JwtStrategy, JwtService],
  exports: [MyLibraryService, JwtAuthGuard, JwtStrategy, JwtService],
})
export class MyLibraryModule {}
