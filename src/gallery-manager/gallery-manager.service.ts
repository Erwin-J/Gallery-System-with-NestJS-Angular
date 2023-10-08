import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { access, mkdir, unlink, writeFile, readdir, rename } from "fs/promises";
import { CategoryWithImages } from "./models/CategoryWithImages";
import { ImageUpdate } from "./models/imageUpdate";
import { UploadingFile } from "./models/uploadingFile";
import { Image } from "./models/image";

@Injectable()
export class GalleryManagerService {
  image_folder: string;

  constructor(private readonly configService: ConfigService) {
    this.image_folder = this.configService.get<string>("IMAGE_FOLDER");
  }

  async getFolders(): Promise<string[]> {
    return (
      await readdir(this.image_folder, {
        withFileTypes: true,
      })
    )
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  }

  async getFilesInFolder(folderName: string): Promise<string[]> {
    return (
      await readdir(`${this.image_folder}/${folderName}`, {
        withFileTypes: true,
      })
    )
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
  }

  async getFilesWithFolder(): Promise<CategoryWithImages[]> {
    const categoriesWithImages: CategoryWithImages[] = [];

    const folders = (
      await readdir(this.image_folder, {
        withFileTypes: true,
      })
    )
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    await Promise.all(
      folders.map(async (f) => {
        const images = (
          await readdir(`${this.image_folder}/${f}`, {
            withFileTypes: true,
          })
        )
          .filter((dirent) => dirent.isFile())
          .map((dirent) => dirent.name);

        const categoryWithImages: CategoryWithImages = {
          category: f,
          images: images,
        };

        categoriesWithImages.push(categoryWithImages);
      })
    );

    return categoriesWithImages;
  }

  async getFilesForCategory(category: string): Promise<Image[]> {
    const imagesByCategory: Image[] = [];

    try {
      const images = (
        await readdir(`${this.image_folder}/${category}`, {
          withFileTypes: true,
        })
      )
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);

      images.forEach((imageName: string) => {
        imagesByCategory.push({
          category: category,
          url: imageName,
        });
      });
    } catch (error) {
      console.error("Error reading files:", error);
    }

    return imagesByCategory;
  }

  async addFiles(uploadingFiles: UploadingFile[]): Promise<void> {
    try {
      const path = require("path");

      uploadingFiles.forEach(async (f) => {
        const base64Data = Buffer.from(
          f.base64url.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        await writeFile(
          path.join(`${this.image_folder}/${f.category}`, f.name),
          base64Data
        );
      });
    } catch (err) {
      console.error(err);
      throw new Error(`Could not fully upload for ${uploadingFiles}`);
    }
  }

  async update(imageUpdate: ImageUpdate): Promise<void> {
    try {
      const dir = `${this.image_folder}/${imageUpdate.folder}`;

      rename(
        `${dir}/${imageUpdate.draggedImageName}`,
        `${dir}/${imageUpdate.newDraggedImageName}`
      );

      rename(
        `${dir}/${imageUpdate.swappedImageName}`,
        `${dir}/${imageUpdate.newSwappedImageName}`
      );
    } catch (err) {
      console.error(err);
      throw new Error(
        `Could not update one or more images in folder ${imageUpdate.folder}`
      );
    }
  }

  async createFolder(folderName: string): Promise<void> {
    try {
      const dir = `${this.image_folder}/${folderName}`;

      try {
        await access(dir);
      } catch (error) {
        await mkdir(dir, { recursive: true });
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Could not create folder ${folderName}`);
    }
  }

  async deleteFileInFolder(
    folderName: string,
    fileName: string
  ): Promise<void> {
    try {
      await unlink(`${this.image_folder}/${folderName}/${fileName}`);
    } catch (error) {
      console.error(error);
      throw new Error(
        `Could not remove ${this.image_folder}/${folderName}/${fileName}.`
      );
    }
  }
  async deleteFolder(folderName: string): Promise<void> {
    try {
      const path = `${this.image_folder}/${folderName}`;
      const fs = require("fs");

      if (fs.existsSync(path)) {
        fs.rm(path, { recursive: true, maxRetries: 3 }, (error) => {
          if (error) {
            throw new Error(
              `Could not remove ${this.image_folder}/${folderName}.`
            );
          }
        });
      }
    } catch (err) {
      throw new Error(`Could not remove ${this.image_folder}/${folderName}.`);
    }
  }
}
