import { MapComponent } from './map/map/map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth-guard';
import { LoginComponent } from './auth/login/login.component';
import { GeneralGuard } from './auth/guards/general.guard';


const routes: Routes = [

  { path: '', redirectTo: '/map', pathMatch:'full', canActivate: [GeneralGuard]},
  { path: 'login', component:LoginComponent, pathMatch:'full', canActivate: [AuthGuard]},
  { path: 'map', component:MapComponent, pathMatch:'full', canActivate: [GeneralGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
