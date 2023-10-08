import { UploadingFile } from "./models/uploadingFile";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { GalleryManagerService } from "./gallery-manager.service";
import { AuthGuard } from "@nestjs/passport";
import { CategoryWithImages } from "./models/CategoryWithImages";
import { ImageUpdate as ImageUpdate } from "./models/imageUpdate";
import { Image } from "./models/image";

@Controller("api/gallery-manager")
export class GalleryManagerController {
  constructor(private galleryManagerService: GalleryManagerService) {}

  @Get("categories/images")
  async getFilesWithFolder(): Promise<CategoryWithImages[]> {
    return await this.galleryManagerService.getFilesWithFolder();
  }

  @Get("category/:category")
  async getImagesForCategory(
    @Param("category") category: string
  ): Promise<Image[]> {
    return await this.galleryManagerService.getFilesForCategory(category);
  }

  @Get("folders")
  @UseGuards(AuthGuard("jwt"))
  async getFolders(): Promise<string[]> {
    return await this.galleryManagerService.getFolders();
  }

  @Get("files/:folderName")
  @UseGuards(AuthGuard("jwt"))
  async getFiles(@Param("folderName") folderName: string): Promise<string[]> {
    return await this.galleryManagerService.getFilesInFolder(folderName);
  }

  @Delete("files/:folderName/:imageName")
  @UseGuards(AuthGuard("jwt"))
  async deleteFile(@Param() params: any): Promise<void> {
    await this.galleryManagerService.deleteFileInFolder(
      params.folderName,
      params.imageName
    );
  }

  @Delete("folder/delete/:folderName")
  @UseGuards(AuthGuard("jwt"))
  async deleteFolder(@Param("folderName") folderName: string): Promise<void> {
    await this.galleryManagerService.deleteFolder(folderName);
  }

  @Post("create/:folderName")
  @UseGuards(AuthGuard("jwt"))
  async createFolder(@Param("folderName") folderName: string): Promise<void> {
    await this.galleryManagerService.createFolder(folderName);
  }

  @Post("upload")
  @UseGuards(AuthGuard("jwt"))
  async uploadFile(@Body() uploadingFiles: UploadingFile[]): Promise<void> {
    await this.galleryManagerService.addFiles(
      uploadingFiles.filter((u) => this.isValidImageFileType(u.type))
    );
  }

  @Put("update")
  @UseGuards(AuthGuard("jwt"))
  async update(@Body() imageUpdate: ImageUpdate): Promise<void> {
    await this.galleryManagerService.update(imageUpdate);
  }

  private isValidImageFileType(type: string): boolean {
    return (
      type === "image/jpeg" ||
      type === "image/jpg" ||
      type === "image/png" ||
      type === "image/gif"
    );
  }
}
