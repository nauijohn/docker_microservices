import {
  JsonWebTokenExceptionFilter,
  TokenExpiredExceptionFilter,
} from "@nauijohn/docker_microservices_common";
import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";

import { TodosModule } from "./todos.module";

async function bootstrap() {
  const app = await NestFactory.create(TodosModule);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new TokenExpiredExceptionFilter(httpAdapter),
    new JsonWebTokenExceptionFilter(httpAdapter),
  );

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  });
}
void bootstrap();
