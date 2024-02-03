import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnDestroy {
  user = localStorage.getItem('username')

  constructor(private _snackBar: MatSnackBar) {
    const reloaded = localStorage.getItem('reloaded');
    if (!reloaded) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      this._snackBar.open(`Welcome back, ${this.user}!`, 'Close');
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('reloaded');
  }
  
}
