import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ImageUdate } from '../../models/image-update';

@Component({
  selector: 'drag-drop-grid',
  templateUrl: './drag-drop-grid.component.html',
  styleUrls: ['./drag-drop-grid.component.css'],
})
export class DragDropGridComponent {
  @Input()
  set items(value: any[]) {
    if (!value) {
      return;
    }

    this._items = value.sort((a, b) => {
      let aMatch = a.match(/\[(\d+)\]/);
      let aNumber = parseInt(aMatch[1]);

      let bMatch = b.match(/\[(\d+)\]/);
      let bNumber = parseInt(bMatch[1]);

      return aNumber - bNumber;
    });
  }

  get items(): any[] {
    return this._items;
  }

  @Output()
  onImageReorder: EventEmitter<ImageUdate> = new EventEmitter<ImageUdate>();

  @Output()
  onDeleteImage: EventEmitter<string> = new EventEmitter<string>();

  private _items: any[] = [];

  constructor(private route: ActivatedRoute) {}

  drop(event: CdkDragDrop<any>) {
    const draggedImage = this.items[event.previousContainer.data.index];
    const swappedImage = this.items[event.container.data.index];

    const draggedIndex = this.items.indexOf(draggedImage);
    const swappedIndex = this.items.indexOf(swappedImage);

    const updatedDraggedImage = draggedImage.replace(
      /\[(.+?)\]/g,
      '[' + swappedIndex + ']'
    );
    const updatedSwappedImage = swappedImage.replace(
      /\[(.+?)\]/g,
      '[' + draggedIndex + ']'
    );

    this.items[event.previousContainer.data.index] = event.container.data.item;
    this.items[event.container.data.index] = event.previousContainer.data.item;

    this.onImageReorder.emit({
      draggedImageName: draggedImage,
      swappedImageName: swappedImage,
      newDraggedImageName: updatedDraggedImage,
      newSwappedImageName: updatedSwappedImage,
      folder: '',
    });
  }

  getBackgroundImage(image: string) {
    const category = this.route.snapshot.paramMap.get('category');
    return encodeURIComponent(
      `${environment.IMAGES_PATH}/${category}/${image}`
    );
  }

  removeImage(image: string) {
    this.onDeleteImage.emit(image);
  }
}
