import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

interface Account {
  email: string,
  username: string
}

interface ChatsResponse {
  result: Account[],
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

  getChats(): Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>(`https://${this.auth.hostnameGetter}/api/chats/getChats`, { withCredentials: true });
  }
}
