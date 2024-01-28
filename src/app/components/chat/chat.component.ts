import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from 'src/app/services/chats.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  @ViewChild('message') messageInput!: ElementRef;

  sendMessage() {
    const message = this.messageInput.nativeElement.value;
    this.chat.sendMessage(message, this.email).subscribe((data) => {
      console.log(data)
      this.messageInput.nativeElement.value = '';
    })
  }
  messages: any;
  id: number | undefined;
  email!: string ;



  refreshComponent() {
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.checkMessages();
    setInterval(() => this.checkMessages(), 2000);
  }

  checkMessages() {
    this.chat.getChatMessages(this.email).subscribe((data) => {
      console.log(data)
      this.messages = data.result;
      this.id = data.id;
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private chat: ChatsService) {
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.refreshComponent();
    }
    });
  }

}
