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
    console.log(this.wasLogged)
    if(this.wasLogged)
      this.auth.logout()
    console.log(this.wasLogged)
  }

}

// Zhang è il migliore
// l = 69
// for i in range (l):
//    print("COSTA OBESE")
