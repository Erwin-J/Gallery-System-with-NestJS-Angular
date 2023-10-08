import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { GalleryManagerService } from '../services/gallery-manager.service';
import { ADMIN_CONSTANTS } from './models/ADMIN_CONSTANTS';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  subject: Subject<any> = new Subject<any>();
  getFolders$: Observable<string[]>;

  isUserLoggedIn: boolean = false;
  isTokenExpired: boolean = false;

  constructor(private galleryManagerService: GalleryManagerService) {}

  ngOnInit(): void {
    this.getFolders$ = this.subject.asObservable().pipe(
      startWith(0),
      catchError(() => {
        return of([]);
      }),
      switchMap(() =>
        this.galleryManagerService.getFolders().pipe(map((c) => c))
      )
    );
  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  createFolder(folderName: string) {
    const sessionToken: any = sessionStorage.getItem(
      ADMIN_CONSTANTS.TOKEN_NAME
    );

    if (!sessionToken) {
      this.isTokenExpired = true;
      this.isUserLoggedIn = false;
      return;
    }

    if (!folderName) {
      return;
    }
    this.galleryManagerService
      .createFolder(folderName)
      .pipe(take(1))
      .subscribe(() => {
        this.subject.next(void 0);
      });
  }

  removeFolder(folderName: string) {
    if (!folderName) {
      return;
    }

    this.galleryManagerService
      .removeFolder(folderName)
      .pipe(take(1))
      .subscribe(() => {
        this.subject.next(void 0);
      });
  }

  onUserLoggedIn(): void {
    this.isUserLoggedIn = true;
    this.subject.next(void 0);
  }

  logout(): void {
    sessionStorage.removeItem(ADMIN_CONSTANTS.TOKEN_NAME);
    this.isUserLoggedIn = false;
  }
}
