import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

interface Account {
  email: string,
  username: string
}
interface CreateChatResponse {
  result: String,
}
interface ChatsResponse {
  result: Account[],
}
interface Messages{
  text: string,
  insert_date: string,
  update_date: string,
  id_sender: string
}
interface ChatsMessagesResponse {
  result: Messages[],
  id: number
}
@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private accounts: Account[] = []

  public serverError = false

  get accountsGetter() {
    return this.accounts;
  }

  constructor(private http: HttpClient, public auth: AuthService) { }

  addChat(email: string) {
    return this.http.post<CreateChatResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/chats/createChat`, {email: email}, { withCredentials: true });
  }

  getChats(): Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/chats/getChats`, { withCredentials: true });
  }

  getChatMessages(email: String): Observable<ChatsMessagesResponse> {
    return this.http.post<ChatsMessagesResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/chats/getChatMessages`, {email: email}, { withCredentials: true });
  }

  sendMessage(text: String, email: String): Observable<CreateChatResponse> {
    return this.http.post<CreateChatResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/chats/sendMessage`, {email: email, text: text}, { withCredentials: true });
  }
}
