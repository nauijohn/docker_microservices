import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { TodosModule } from "./todos.module";

async function bootstrap() {
  const app = await NestFactory.create(TodosModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  });
}
void bootstrap();
