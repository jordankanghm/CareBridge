import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestsComponent } from './requests/requests.component';
import { ElderlyRequestsComponent } from './elderly-requests/elderly-requests.component';
import { VolunteerRequestsComponent } from './volunteer-requests/volunteer-requests.component';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: RequestsComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'elderly-requests', component: ElderlyRequestsComponent },
  { path: 'volunteer-requests', component: VolunteerRequestsComponent }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
