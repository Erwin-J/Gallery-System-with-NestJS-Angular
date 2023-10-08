import { take } from 'rxjs';
import { GalleryService } from './../services/gallery.service';
import { Component, OnInit } from '@angular/core';
import { CategoryWithImages } from '../models/categorywithImages';
import { environment } from '../../environments/environment';
import { Image } from './../models/image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];

  get categories(): string[] {
    return [...new Set(this.images.map((r) => r.category))];
  }

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService
      .getCategoriesWithImages()
      .pipe(take(1))
      .subscribe((categoriesWithImages) => {
        categoriesWithImages.forEach((categoryWithImages) => {
          if (this.invalidCategoryWithImages(categoryWithImages)) {
            return;
          }

          categoryWithImages.images.forEach((i) => {
            const image: Image = {
              id: this.generateId(i),
              url: `${environment.IMAGES_PATH}/${categoryWithImages.category}/${i}`,
              category: categoryWithImages.category,
            };

            this.images.push(image);
          });
        });
      });
  }

  private generateId(imageName: string): string {
    let aMatch = imageName.match(/\[(\d+)\]/);
    if (!aMatch) {
      aMatch = ['', '999'];
    }

    return `${aMatch[1]}_${(
      new Date().getTime() *
      Math.random() *
      100000
    ).toString()}`;
  }

  private invalidCategoryWithImages(categoryWithImages: CategoryWithImages) {
    return (
      !categoryWithImages ||
      !categoryWithImages.images ||
      categoryWithImages.images.length === 0
    );
  }
}
