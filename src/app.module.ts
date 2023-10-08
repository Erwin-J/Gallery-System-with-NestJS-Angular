import { GalleryManagerService } from "./gallery-manager/gallery-manager.service";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { GalleryManagerController } from "./gallery-manager/gallery-manager.controller";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "frontend"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, GalleryManagerController],
  providers: [GalleryManagerService],
})
export class AppModule {}
