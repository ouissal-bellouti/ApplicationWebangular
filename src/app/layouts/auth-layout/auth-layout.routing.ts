import { Routes } from '@angular/router';

import { RtlComponent } from '../../pages/rtl/rtl.component';

import { from } from 'rxjs';
import { AuthLayoutComponent } from './auth-layout.component';


export const AuthLayoutRoutes: Routes = [
  { path:'login', component: AuthLayoutComponent }

];
