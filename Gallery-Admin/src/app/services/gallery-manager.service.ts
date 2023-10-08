import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UploadingFile } from '../models/UploadingFile';
import { ADMIN_CONSTANTS } from '../models/ADMIN_CONSTANTS';
import { Token } from '../models/token';
import { ImageUpdate } from '../admin/models/image-update';

@Injectable()
export class GalleryManagerService {
  constructor(private httpClient: HttpClient) {}

  getFolders(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.API_URL}/gallery-manager/folders`,
      { headers: this.getHeaders() }
    );
  }

  getImages(category: string): Observable<string[]> {
    return this.httpClient.get<any[]>(
      `${environment.API_URL}/gallery-manager/files/${category}`,
      { headers: this.getHeaders() }
    );
  }

  createFolder(folderName: string): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.API_URL}/gallery-manager/create/${folderName}`,
      { folderName },
      { headers: this.getHeaders() }
    );
  }

  deleteImage(folderName: string, imageName: string): Observable<string[]> {
    return this.httpClient.delete<any[]>(
      `${environment.API_URL}/gallery-manager/files/${folderName}/${imageName}`,
      { headers: this.getHeaders() }
    );
  }

  removeFolder(folderName: string): Observable<string[]> {
    return this.httpClient.delete<any[]>(
      `${environment.API_URL}/gallery-manager/folder/delete/${folderName}`,
      { headers: this.getHeaders() }
    );
  }

  upload(uploadFiles: UploadingFile[]): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.API_URL}/gallery-manager/upload`,
      uploadFiles,
      { headers: this.getHeaders() }
    );
  }

  update(imageUpdate: ImageUpdate): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.API_URL}/gallery-manager/update`,
      imageUpdate,
      { headers: this.getHeaders() }
    );
  }

  private getHeaders() {
    const token: Token = JSON.parse(
      sessionStorage.getItem(ADMIN_CONSTANTS.TOKEN_NAME)!
    );

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token?.access_token}`,
    });

    return headers;
  }
}
