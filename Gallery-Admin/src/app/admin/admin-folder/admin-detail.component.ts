import { UploadingFile } from './UploadingFile';
import { take, takeUntil } from 'rxjs/operators';
import { GalleryManagerService } from '../../services/gallery-manager.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ADMIN_CONSTANTS } from '../models/ADMIN_CONSTANTS';
import { ImageUpdate } from '../models/image-update';

@Component({
  selector: 'admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css'],
})
export class AdminDetailComponent implements OnInit, OnDestroy {
  @ViewChild('uploadField')
  uploadField: ElementRef;

  images: any[];
  path: string;
  destroyed: Subject<any> = new Subject();

  uploadForm: FormGroup;
  isTokenExpired: boolean = false;
  loading: boolean = false;
  updating: boolean = false;

  get photos(): FormArray {
    return this.uploadForm.get('photos') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private galleryManagerService: GalleryManagerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.destroyed.next(void 0);
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      photos: this.formBuilder.array([]),
    });

    const category = this.route.snapshot.paramMap.get('category');
    this.path = `${environment.IMAGES_PATH}/${category}/`;

    this.fetchImages(category);
  }

  getBackgroundImage(image: string) {
    return encodeURIComponent(`${this.path}${image}`);
  }

  createItem(data: any): FormGroup {
    return this.formBuilder.group(data);
  }

  update(event: ImageUpdate) {
    this.updating = true;
    const category = this.route.snapshot.paramMap.get('category');

    event.folder = category!;

    this.galleryManagerService
      .update(event)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: () => {
          this.fetchImages(category);
        },
        error: () => {},
        complete: () => {
          this.updating = false;
        },
      });
  }

  addImages() {
    const photosUploadForm = this.uploadForm.get('photos')!;

    if (
      !photosUploadForm.value ||
      (photosUploadForm.value && photosUploadForm.value.length === 0)
    ) {
      return;
    }

    const sessionToken: any = sessionStorage.getItem(
      ADMIN_CONSTANTS.TOKEN_NAME
    );

    if (!sessionToken) {
      this.isTokenExpired = true;
      return;
    }

    const category = this.route.snapshot.paramMap.get('category')!;

    const uploadingFiles: UploadingFile[] = this.uploadForm
      .get('photos')!
      .value.map((p: any, index: number) => {
        const currentIndexAmount = this.images.length ?? 0;

        const imageName: string = `[${
          index + currentIndexAmount
        }]_${+new Date()}_${p.file.name}`;

        return {
          name: imageName,
          base64url: p.url,
          type: p.file.type,
          category: this.route.snapshot.paramMap.get('category')!,
        };
      });

    this.loading = true;

    this.galleryManagerService
      .upload(uploadingFiles)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.fetchImages(category);
        },
        error: () => {},
        complete: () => {
          this.loading = false;
        },
      });

    this.clear();
  }

  detectFiles(event: any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(
            this.createItem({
              file,
              url: e.target.result,
            })
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage(imageName: string): void {
    const sessionToken: any = sessionStorage.getItem(
      ADMIN_CONSTANTS.TOKEN_NAME
    );

    if (!sessionToken) {
      this.isTokenExpired = true;
      return;
    }

    const category = this.route.snapshot.paramMap.get('category')!;

    this.galleryManagerService
      .deleteImage(category, imageName)
      .pipe(take(1))
      .subscribe(() => {
        this.fetchImages(category);
      });
  }

  clear(): void {
    const photosUploadForm = this.uploadForm.get('photos')!;

    this.uploadForm.reset();

    const formArray = photosUploadForm as FormArray;
    formArray.controls = [];
    photosUploadForm.setValue([]);

    this.uploadField.nativeElement.value = '';
  }

  private fetchImages(category: string | null) {
    const sessionToken: any = sessionStorage.getItem(
      ADMIN_CONSTANTS.TOKEN_NAME
    );

    if (!sessionToken) {
      this.isTokenExpired = true;
      return;
    }

    this.galleryManagerService
      .getImages(category!)
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => (this.images = result.map((r) => `${r}`)));
  }
}
