import { Component, Input } from '@angular/core';
import { Image } from '../../models/image';

@Component({
  selector: 'gallery-content',
  templateUrl: './gallery-content.component.html',
  styleUrls: ['./gallery-content.component.css'],
})
export class GalleryContentComponent {
  constructor() {}
  @Input()
  categories: string[];

  @Input()
  allImages: Image[] = [];

  images: Image[];
  filterBy?: string = 'all';

  displayStyle: string = 'none';
  currentCategory: string = 'all';
  popupImage: Image;

  ngOnInit(): void {
    this.images = this.allImages;
  }

  setCategory(category: string) {
    this.currentCategory = category;
    this.images = [];

    if (category === 'all') {
      this.images = this.allImages.slice().sort(this.byPriority());
    } else {
      this.filterBy = category;
      this.images = this.allImages
        .slice()
        .filter((i) => i.category === category)
        .sort(this.byPriority());
    }
  }

  isCategorySelected(category: string) {
    return category === this.currentCategory;
  }

  private byPriority(): ((a: Image, b: Image) => number) | undefined {
    return (a, b) => {
      let aNumber = parseInt(a.id!.split('_')[0]);
      let bNumber = parseInt(b.id!.split('_')[0]);
      return aNumber - bNumber;
    };
  }
}
