import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/services-details.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { FormWorkerComponent } from './form-worker/form-worker.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:serviceName', component: ServiceDetailsComponent },
  { path: 'services/:serviceName/worker/:workerId', component: WorkerDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'form', component: FormWorkerComponent , canActivate: [AuthGuard] },
 
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
