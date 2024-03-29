import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/chat/chat.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {MatCardModule} from '@angular/material/card';
import { AfterLoginComponent } from './components/after-login/after-login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AfterVerifyEmailComponent } from './components/after-verify-email/after-verify-email.component';
import { LoginErrorComponent } from './components/login-error/login-error.component';
import { SignupErrorComponent } from './components/signup-error/signup-error.component';
import { ChatsComponent } from './components/chats/chats.component';
import { AddChatComponent } from './components/add-chat/add-chat.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CookieService } from 'ngx-cookie-service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeaturesComponent } from './components/features/features.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { AfterGoogleLoginComponent } from './components/after-google-login/after-google-login.component';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    HomeComponent,
    AuthComponent,
    SignupComponent,
    VerifyEmailComponent,
    AfterLoginComponent,
    LogoutComponent,
    AfterVerifyEmailComponent,
    LoginErrorComponent,
    SignupErrorComponent,
    ChatsComponent,
    AddChatComponent,
    FeaturesComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    AfterGoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTreeModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    NgbModule,
    CarouselModule,
    NgbDropdownModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
