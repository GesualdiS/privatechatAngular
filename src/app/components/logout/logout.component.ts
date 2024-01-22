import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{

  public wasLogged!: Boolean;

  constructor(public auth: AuthService, private _snackBar: MatSnackBar){
    this.wasLogged = localStorage.getItem("isLogged") === "true"
    if(this.wasLogged){
      this.auth.logout()
      localStorage.setItem("wasLogged", "true")
      window.location.reload()
    }else if(localStorage.getItem("wasLogged") === "true"){
      localStorage.clear()
      this._snackBar.open('You\'ve successfully logged out.', 'Close');
    }else{
      this._snackBar.open('Looks like you forgot to log in.', 'Close');
    }
  }

}

// Zhang è il migliore
// l = 69
// for i in range (l):
//    print("COSTA OBESE")
