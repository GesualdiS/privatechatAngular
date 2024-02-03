import { Component, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChatsService } from './services/chats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  getUserProfilePicture(email: string) {
    return `${this.auth.blobImagesUrl}/${email}-profilePicture.jpeg?${this.auth.sasToken}`;
  }

  public user = localStorage.getItem("username")

  public isLogged = localStorage.getItem("isLogged") === "true"

  public imageUrl: String;

  public accounts: any;

  constructor (public auth: AuthService, public chat: ChatsService, private _renderer: Renderer2){
    this._renderer.setStyle(document.body, 'overflow', 'hidden');

    chat.getChats().subscribe((data) => {
      this.accounts = data.result;
      this.accounts = data.result.map(account => {
        const imageUrl = `${auth.blobImagesUrl}/${account.email}-profilePicture.jpeg?${this.auth.sasToken}`;
        return { email: account.email, username: account.username, imageUrl };
      });
    }, (error) => {
      console.error('Error:', error);
      chat.serverError = true;
    });
    this.imageUrl = `${auth.blobImagesUrl}/${localStorage.getItem("email")}-profilePicture.jpeg?${this.auth.sasToken}`;
  }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem("isLogged") === "true";
  }
  title = 'privatechat';
}
