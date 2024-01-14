import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  private hostname = "privatechat.azurewebsites.net"

  constructor(private http: HttpClient, private router: Router) { }

  async verifyEmail<VerifyResponse>(token: string): Promise<VerifyResponse> {
    try {
      return await this.http.get<VerifyResponse>(`https://${this.hostname}/api/auth/verifyEmail/${token}`).toPromise() as VerifyResponse;
    } catch (error) {
      console.error('Verification error:', error);
      throw error; // Re-throw the error for the component to handle
    }
  }


  createUser(username: string, email: string, password: string){
    this.http.post<AuthResponse>(`https://${this.hostname}/api/crud/createUser`, {username: username, email: email, password: password}).subscribe((data) => {
      if (data.result === "User created successfully") {
        this.router.navigate(['/home/verifyEmail']);
        localStorage.setItem('username', username);
      }
    }, (error) =>{
      console.error('Error during login:', error);
      this.router.navigate(['/signup/signupError']);
    });
  }

  loginUser(email: String, password: String) {
    this.http.post<VerifyResponse>(`https://${this.hostname}/api/auth/login`, { email: email, password: password }).subscribe((data) => {
      if (data.result === "User verified") {
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("username", data.username);
        this.router.navigate(['/home/afterLogin']);
      }else {
        this.router.navigate(['/login/loginError']);
      }
    },(error) => {
      console.error('Error during login:', error);
      this.router.navigate(['/login/loginError']);
    });
  }

  logout(){
    localStorage.clear()
  }
}
