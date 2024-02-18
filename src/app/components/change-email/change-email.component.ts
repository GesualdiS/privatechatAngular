import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { hide } from '@popperjs/core';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent {
  firstFormGroup1 = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup1 = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
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
    this.user.getChangeEmailToken(this.firstFormGroup1.value.firstCtrl!, this.secondFormGroup1.value.secondCtrl!).subscribe((data) => {
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
    this.user.changeEmail(this.firstFormGroup.value.firstCtrl!, this.secondFormGroup.value.secondCtrl!, this.thirdFormGroup.value.thirdCtrl!).subscribe((data) => {
      this._snackBar.open(data.result, 'Close');
    })
  }

}
