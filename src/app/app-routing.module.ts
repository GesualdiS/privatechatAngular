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
import { ChatsComponent } from './components/chats/chats.component';
import { AfterLoginComponent } from './components/after-login/after-login.component';
import { AddChatComponent } from './components/add-chat/add-chat.component';
import { ChatComponent } from './components/chat/chat.component';
import { FeaturesComponent } from './components/features/features.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, children: [
    { path: 'verifyEmail', component:  VerifyEmailComponent},
    { path: 'afterLogin', component:  AfterLoginComponent},
    {path: 'logout', component: LogoutComponent},
    { path: 'verify-email', component: AfterVerifyEmailComponent },
    { path: 'verify-email/:token', component: AfterVerifyEmailComponent },
  ]},
  {path: 'login', component: AuthComponent, children: [
    { path: 'loginError', component:  LoginErrorComponent}
  ]},
  {path: 'help', component: FeaturesComponent},
  {path: 'chats', component: ChatsComponent},
  {path: 'accountSettings', component: AccountSettingsComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'changePassword/:token', component: ChangePasswordComponent},
  {path: 'changeEmail', component: ChangeEmailComponent},
  {path: 'changeEmail/:token', component: ChangeEmailComponent},
  {path: 'chat/:email', component: ChatComponent},
  {path: 'signup', component: AuthComponent, children: [
    { path: 'signupError', component:  SignupErrorComponent},
  ]},
  { path: 'addChat', component: AddChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
