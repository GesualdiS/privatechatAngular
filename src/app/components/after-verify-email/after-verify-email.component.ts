import { Component } from '@angular/core';

@Component({
  selector: 'app-after-verify-email',
  templateUrl: './after-verify-email.component.html',
  styleUrls: ['./after-verify-email.component.css']
})
export class AfterVerifyEmailComponent {
  user = localStorage.getItem('username')
}
