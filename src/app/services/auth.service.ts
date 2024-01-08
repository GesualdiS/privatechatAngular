import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
interface AuthResponse {
  result: string,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public isLogged: Boolean = false

  createUser(username: string, email: string, password: string){

    this.http.post<AuthResponse>('https://privatechat.azurewebsites.net/api/crud/createUser', {username: username, email: email, password: password}).subscribe((data) => {
      if (data.result === "User created successfully") {
        this.router.navigate(['/home/verifyEmail']);
        localStorage.setItem('username', username);
        this.isLogged = true
      }
    });
  }

  loginUser(email: String, password: String){
    this.http.post<AuthResponse>('https://privatechat.azurewebsites.net/api/auth/login', {email: email, password: password}).subscribe((data) => {
      if (data.result === "User verified") {
        this.router.navigate(['/home/afterLogin']);
      }
      console.log(data)
    });
  }
}
