import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  user = localStorage.getItem('username')

  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit() {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      this._snackBar.open(`Welcome back, ${this.user}!`, 'Close');
      localStorage.removeItem('reloaded');
    }
  }
}
