import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AfterVerifyEmailComponent } from './components/after-verify-email/after-verify-email.component';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { SignupErrorComponent } from './components/signup-error/signup-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, children: [
    { path: 'verifyEmail', component:  VerifyEmailComponent},
    { path: 'afterLogin', component:  VerifyEmailComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'afterVerifyEmail', component: AfterVerifyEmailComponent},
  ]},
  {path: 'login', component: AuthComponent, children: [
    { path: 'loginError', component:  LoginErrorComponent}
  ]},
  {path: 'signup', component: AuthComponent, children: [
    { path: 'signupError', component:  SignupErrorComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
