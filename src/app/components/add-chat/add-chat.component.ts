import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {StepperOrientation} from '@angular/material/stepper';
import { ChatsService } from 'src/app/services/chats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent {
  panelOpenState = false;
  stepperOrientation: Observable<StepperOrientation>;

  addChat(){
    const email = this.firstFormGroup.value.firstCtrl
    if(!email){
      console.log("No email")
      return
    }
    this.chat.addChat(email).subscribe((data) => {
      if (data.result === "Chat created successfully") {
        console.log("Chat created successfully")
        this.router.navigate([`/chat/${email}`]);
      }else{
        console.log("Chat not created", data.result)
      }
    })
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private chat: ChatsService,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required, Validators.email]],
  });
}
