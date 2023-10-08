import { NestFactory } from "@nestjs/core";
import { json } from "express";
import { AppModule } from "./app.module";
import { json as jsonbodypost } from "body-parser";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: "*",
    origin: process.env.ALLOWED_ORIGIN,
  });

  app.use("/api/gallery-manager/upload", json({ limit: "500mb" }));
  app.use(jsonbodypost({ type: "application/json" }));
  await app.listen(+process.env.PORT);
}

bootstrap();
