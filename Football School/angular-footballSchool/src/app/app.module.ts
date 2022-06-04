import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilComponent } from './pages/profil/profil.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GalleryComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProvidersComponent,
    ProfilComponent
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [
   { 
     provide : HTTP_INTERCEPTORS,
     useClass :AuthInterceptor,
     multi : true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
