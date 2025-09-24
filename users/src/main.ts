import passport from "passport";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(passport.initialize());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Users service is running on port ${process.env.PORT ?? 3000}...`,
    );
  });
}
void bootstrap();
