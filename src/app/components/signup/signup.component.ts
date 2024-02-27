import { Component, OnChanges, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  hidePassword = true
  public ris = false
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', [Validators.required, Validators.email]],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    public user: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  createUser(){
    let username = this.firstFormGroup.get('firstCtrl')?.value!
    let password = this.secondFormGroup.get('secondCtrl')?.value!
    if(!this.user.checkPassword(password)){
      this._snackBar.open('Password not secure enough', 'Close');
      return;
    }
    let email = this.thirdFormGroup.get('thirdCtrl')?.value!
    console.log(email, username, password)
    this.auth.createUser(username, password, email)
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}

