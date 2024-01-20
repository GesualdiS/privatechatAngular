import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent{

  public wasLogged!: Boolean;

  constructor(public auth: AuthService){
    this.wasLogged = localStorage.getItem("isLogged") === "true"
    if(this.wasLogged){
      this.auth.logout()
      localStorage.setItem("wasLogged", "true")
      window.location.reload()
    }else if(localStorage.getItem("wasLogged") === "true"){
      localStorage.clear()
      this.wasLogged = true
    }
  }

}

// Zhang è il migliore
// l = 69
// for i in range (l):
//    print("COSTA OBESE")
