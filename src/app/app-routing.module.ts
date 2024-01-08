import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AfterVerifyEmailComponent } from './components/after-verify-email/after-verify-email.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, children: [
    { path: 'verifyEmail', component:  VerifyEmailComponent},
    { path: 'afterLogin', component:  VerifyEmailComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'afterVerifyEmail', component: AfterVerifyEmailComponent},
  ]},
  {path: 'login', component: AuthComponent},
  {path: 'signin', component: AuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
