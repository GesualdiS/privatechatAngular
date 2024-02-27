import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject, TemplateRef } from '@angular/core';
import {NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { hide } from '@popperjs/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  private offcanvasService = inject(NgbOffcanvas);
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  step = 0;
  stepperOrientation: Observable<StepperOrientation>;
  email = new FormControl('', [Validators.required, Validators.email]);
  token: string = '';
  hidePassword: any;

  constructor( private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private user: UserService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.token = this.route.snapshot.paramMap.get('token')!;
    if (this.token != null) {
      this.step = 1;
      this.firstFormGroup.get('firstCtrl')?.setValue(this.token);
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  sendToken() {
    this.user.getChangePasswordToken(this.email.value!).subscribe((data) => {
      this._snackBar.open(data.result, 'Close');
    })
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  changePassword() {
    const password = this.firstFormGroup.value.firstCtrl!;
    if(this.user.checkPassword(password) && password === this.thirdFormGroup.value.thirdCtrl){
      this.user.changePassword(password, this.secondFormGroup.value.secondCtrl!).subscribe((data) => {
        this._snackBar.open(data.result, 'Close');
      })
    }else{
      this._snackBar.open('Password not secure enough or different', 'Close');
    }

  }

  openBottom(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'bottom' });
	}

}
