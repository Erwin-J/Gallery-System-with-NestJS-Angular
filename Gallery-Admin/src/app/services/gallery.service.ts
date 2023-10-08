import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryWithImages } from '../models/categorywithImages';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';

@Injectable()
export class GalleryService {
  constructor(private httpClient: HttpClient) {}

  getCategoriesWithImages(): Observable<CategoryWithImages[]> {
    return this.httpClient.get<CategoryWithImages[]>(
      `${environment.API_URL}/gallery-manager/categories/images`
    );
  }

  getImagesByCategory(category: string): Observable<Image[]> {
    return this.httpClient.get<Image[]>(
      `${environment.API_URL}/gallery-manager/category/${category}`
    );
  }
}
