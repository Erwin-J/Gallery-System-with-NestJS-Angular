import { Image } from './../../models/image';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GalleryService } from '../../../app/services/gallery.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery-category',
  templateUrl: './gallery-category.component.html',
  styleUrls: ['./gallery-category.component.css'],
})
export class GalleryCategoryComponent implements OnInit {
  images: Image[];

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((p) =>
      this.galleryService
        .getImagesByCategory(p['category'])
        .pipe(take(1))
        .subscribe((images) => {
          const mappedImages: Image[] = [];

          images.forEach((image: Image) => {
            mappedImages.push({
              category: image.category,
              url: `${environment.IMAGES_PATH}/${image.category}/${image.url}`,
            });
          });

          this.images = mappedImages;
        })
    );
  }
}
