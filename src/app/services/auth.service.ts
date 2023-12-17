import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(username: String, email: String, password: String){
    this.http.post('http://localhost:3000/api/crud/createUser', {username: username, email: email, password: password}).subscribe((data) => {
      console.log(data);
    });
  }
}
