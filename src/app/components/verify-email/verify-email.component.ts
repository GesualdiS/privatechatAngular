import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  user = localStorage.getItem('username')

  constructor(private _snackBar: MatSnackBar) {
    this._snackBar.open(`Hi ${this.user}! If you don\'t see the verification email, please check the spam.`, 'Close');
  }
}
