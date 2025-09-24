import { Module } from "@nestjs/common";

import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { MyLibraryService } from "./my-library.service";

@Module({
  providers: [MyLibraryService, JwtAuthGuard, JwtStrategy],
  exports: [MyLibraryService, JwtAuthGuard, JwtStrategy],
})
export class MyLibraryModule {}
