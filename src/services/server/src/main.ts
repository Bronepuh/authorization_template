import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";

async function start() {
  const PORT = process.env.SERVER_PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.enableShutdownHooks(); // should be enabled for SIGINT handling from docker (and fast stopping container)
  app.enableCors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Accept"],
  });

  await app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
}

start();
