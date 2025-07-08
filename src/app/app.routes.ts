import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BonoFormComponent } from './components/bono-form/bono-form.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
   {
    path: '',
    component: LandingpageComponent // 
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [seguridadGuard]
   // solo construcciones, se debe agregar a cada uno
  },
  {
    path: 'bono-form',
    component: BonoFormComponent,
    canActivate: [seguridadGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
