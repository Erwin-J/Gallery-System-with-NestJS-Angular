import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminDetailComponent } from './admin/admin-folder/admin-detail.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropGridComponent } from './admin/drag-drop-grid/drag-drop-grid.component';
import { GalleryManagerService } from './services/gallery-manager.service';
import { LoginService } from './services/login-service';
import { GalleryService } from './services/gallery.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryContentComponent } from './gallery/gallery-content/gallery-content.component';
import { GalleryCategoriesComponent } from './gallery-categories/gallery-categories.component';
import { GalleryCategoryComponent } from './gallery-categories/gallery-category/gallery-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminContentComponent,
    AdminDetailComponent,
    AdminLoginComponent,
    DragDropGridComponent,
    NavigationComponent,
    GalleryComponent,
    GalleryContentComponent,
    GalleryCategoriesComponent,
    GalleryCategoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    AppRoutingModule,
  ],
  providers: [GalleryManagerService, LoginService, GalleryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
