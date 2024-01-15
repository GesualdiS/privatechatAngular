import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {StepperOrientation} from '@angular/material/stepper';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent {
  panelOpenState = false;
  stepperOrientation: Observable<StepperOrientation>;

  addChat(){

  }
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.email]],
  });
}
