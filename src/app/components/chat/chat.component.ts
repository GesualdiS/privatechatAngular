import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from 'src/app/services/chats.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit{
  @ViewChild('message') messageInput!: ElementRef;
  @ViewChild('chatboxElement', { read: ElementRef }) chatboxElement!: ElementRef;
  private mutationObserver!: MutationObserver;
  messageSent: Boolean = false;

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.mutationObserver = new MutationObserver(() => this.chatboxElement.nativeElement.scrollTop = this.chatboxElement.nativeElement.scrollHeight);
    this.mutationObserver.observe(this.chatboxElement.nativeElement, { childList: true });
    setTimeout(() => this.mutationObserver.disconnect(), 1000)
  }

  sendMessage() {
    const message = this.messageInput.nativeElement.value;
    if(message == ''){
      return
    }
    this.messageInput.nativeElement.value = '';
    this.chat.sendMessage(message, this.email).subscribe((data) => {
      console.log(data)
    })
    this.messageSent = true;
  }
  messages: any;
  id: number | undefined;
  email!: string ;



  refreshComponent() {
    this.email = this.route.snapshot.paramMap.get('email')!;
    this.checkMessages();
    setInterval(() => this.checkMessages(), 2000);
    this.scrollToBottom();
  }

  checkMessages() {
    this.chat.getChatMessages(this.email).subscribe((data) => {
      console.log(data)
      this.messages = data.result;
      this.id = data.id;
    })
    if(this.messageSent){
      this.scrollToBottom();
      this.messageSent = false;
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private chat: ChatsService) {
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.refreshComponent();
    }
    });
  }

}
