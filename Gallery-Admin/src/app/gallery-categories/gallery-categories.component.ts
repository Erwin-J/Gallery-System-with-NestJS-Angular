import { Component } from '@angular/core';
import { CategoryWithImages } from '../models/categorywithImages';
import { take } from 'rxjs';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery-categories',
  templateUrl: './gallery-categories.component.html',
  styleUrls: ['./gallery-categories.component.css'],
})
export class GalleryCategoriesComponent {
  categoriesWithImages: CategoryWithImages[] = [];

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.galleryService
      .getCategoriesWithImages()
      .pipe(take(1))
      .subscribe((categoriesWithImages: CategoryWithImages[]) => {
        categoriesWithImages.forEach(
          (categoryWithImage: CategoryWithImages) => {
            if (this.invalidCategoryWithImages(categoryWithImage)) {
              return;
            }

            this.categoriesWithImages.push(categoryWithImage);
          }
        );
      });
  }

  private invalidCategoryWithImages(categoryWithImages: CategoryWithImages) {
    return (
      !categoryWithImages ||
      !categoryWithImages.images ||
      categoryWithImages.images.length === 0
    );
  }
}
