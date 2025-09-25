import * as Joi from "joi";

import { MyLibraryModule } from "@nauijohn/docker_microservices_common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TodosController } from "./todos.controller";
import { Todo } from "./todos.entity";
import { TodosService } from "./todos.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        NODE_ENV: Joi.string()
          .valid("development", "production", "test", "provision")
          .default("development"),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDev = configService.get<string>("NODE_ENV") === "development";

        return {
          type: "mysql",
          host: configService.get("DB_HOST"),
          port: +configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_DATABASE"),
          entities: [Todo],
          synchronize: isDev,
          autoLoadEntities: isDev,
        };
      },
    }),
    TypeOrmModule.forFeature([Todo]),
    MyLibraryModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
