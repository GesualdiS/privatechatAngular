import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user = localStorage.getItem("username")

  public isLogged = localStorage.getItem("isLogged") === "true"

  constructor (public auth: AuthService){  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem("isLogged") === "true";
  }
  title = 'privatechat';
}
