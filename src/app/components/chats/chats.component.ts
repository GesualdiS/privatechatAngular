import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  public message = ""
  user = localStorage.getItem('username')
  constructor(private auth: AuthService) {
    if(localStorage.getItem('isLogged') === 'true')
      this.message = "Welcome " + this.user + "! Down there you will find the list of the chat you have, hope you enjoy it!"
    else
      this.message = "Before you see your chats, please login!"
  }
}
