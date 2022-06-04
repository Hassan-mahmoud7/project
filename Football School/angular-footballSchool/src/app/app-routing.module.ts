import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { RegisterComponent } from './pages/register/register.component';



const routes: Routes = [
  {path:"home", component:HomeComponent},
 {path:"",redirectTo:"home", pathMatch:'full'},
  {path: "gallery", component:GalleryComponent},
  {path: "login", component:LoginComponent},
  {path: "login/register", component:RegisterComponent},
  {path: "providers/:slug", component:ProvidersComponent},
  {path: "profil/:userId", component:ProfilComponent},
  // {path: "profil", component:ProfilComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
