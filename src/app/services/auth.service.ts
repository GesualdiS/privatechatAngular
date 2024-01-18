import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
interface AuthResponse {
  result: string,
}
interface VerifyResponse {
  result: string,
  accessToken: string,
  refreshToken: string,
  username: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public signupError = false
  public loginError = false

  private hostname = "privatechat.azurewebsites.net"
  user: any;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  async verifyEmail<VerifyResponse>(token: string): Promise<VerifyResponse> {
    try {
      return await this.http.get<VerifyResponse>(`https://${this.hostname}/api/auth/verifyEmail/${token}`).toPromise() as VerifyResponse;
    } catch (error) {
      console.error('Verification error:', error);
      throw error; // Re-throw the error for the component to handle
    }
  }


  createUser(username: string, email: string, password: string){
    return this.http.post<AuthResponse>(`https://${this.hostname}/api/crud/createUser`, {username: username, email: email, password: password}).subscribe((data) => {
      if (data.result === "User created successfully") {
        this.signupError = false
        localStorage.setItem('username', username);
        this.router.navigate(['/home/verifyEmail']);
      }
    }, (error) =>{
      console.error('Error during login:', error);
      this.signupError = true
    });
  }

  loginUser(email: String, password: String) {
    this.http.post<VerifyResponse>(`https://${this.hostname}/api/auth/login`, { email: email, password: password }).subscribe((data) => {
      if (data.result === "User verified") {
        localStorage.setItem("isLogged", "true");
        this.cookieService.set('accessToken', data.accessToken);
        this.cookieService.set('refreshToken', data.refreshToken);
        localStorage.setItem("username", data.username);
        this.router.navigate(['/home/afterLogin']);
        this.loginError = false       
        
      }else {
        this.loginError = true
      }
    },(error) => {
      console.error('Error during login:', error);
      this.loginError = true
    });
  }

  logout(){
    localStorage.clear()
    this.cookieService.deleteAll();
  }
}
