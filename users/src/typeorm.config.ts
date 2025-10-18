// src/typeorm.config.ts
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { RefreshToken } from "./refresh-tokens/refresh-token.entity";
import { User } from "./users";

export const typeOrmConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isDev = configService.get<string>("NODE_ENV") === "development";

  return {
    type: "mysql",
    host: configService.get("DB_HOST"),
    port: +configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_DATABASE"),
    entities: [User, RefreshToken],
    synchronize: isDev,
    autoLoadEntities: isDev,
  };
};
