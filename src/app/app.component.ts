import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChatsService } from './services/chats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user = localStorage.getItem("username")

  public isLogged = localStorage.getItem("isLogged") === "true"

  public accounts: any;

  constructor (public auth: AuthService, public chat: ChatsService){
    chat.getChats().subscribe((data) => {
      this.accounts = data.result;
    }, (error) => {
      console.error('Error:', error);
      chat.serverError = true;
    });
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem("isLogged") === "true";
  }
  title = 'privatechat';
}
