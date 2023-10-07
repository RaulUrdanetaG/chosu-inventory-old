import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NewTagModalComponent } from './components/new-tag-modal/new-tag-modal.component';
import { UpdateTagModalComponent } from './components/update-tag-modal/update-tag-modal.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { NewOwnerModalComponent } from './components/new-owner-modal/new-owner-modal.component';
import { UpdateOwnerModalComponent } from './components/update-owner-modal/update-owner-modal.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent, UpdateTagModalComponent, ConfirmDeleteModalComponent, UpdateOwnerModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NewTagModalComponent,
    NewOwnerModalComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
