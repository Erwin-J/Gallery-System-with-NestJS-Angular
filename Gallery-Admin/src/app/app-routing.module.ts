import { GalleryCategoryComponent } from './gallery-categories/gallery-category/gallery-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDetailComponent } from './admin/admin-folder/admin-detail.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryCategoriesComponent } from './gallery-categories/gallery-categories.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-detail/:category', component: AdminDetailComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery-categories', component: GalleryCategoriesComponent },
  { path: 'gallery-categories/:category', component: GalleryCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
