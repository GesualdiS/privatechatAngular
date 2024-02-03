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
interface refreshAccessTokenResponse {
  result: string,
  accessToken: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public signupError = false
  public loginError = false
  public hasClicked = false
  public sasToken = "st=2024-02-03T08:47:57Z&se=2024-02-03T16:47:57Z&si=images&sip=0.0.0.0-255.255.255.255&spr=https&sv=2022-11-02&sr=c&sig=3yPZ6%2F6FahMRZiLURDS59X3%2BJhoO%2BHOkGJ6NVF2IQlM%3D"

  public blobImagesUrl = "https://privatechatstorage.blob.core.windows.net/images"

  private hostname = "localhost:3000"
  user: any;
  private protocol = "http";

  get protocolGetter() {
    return this.protocol;
  }
  get hostnameGetter() {
    return this.hostname;
  }

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  async verifyEmail<VerifyResponse>(token: string): Promise<VerifyResponse> {
    try {
      return await this.http.get<VerifyResponse>(`${this.protocol}://${this.hostname}/api/auth/verifyEmail/${token}`).toPromise() as VerifyResponse;
    } catch (error) {
      console.error('Verification error:', error);
      throw error; // Re-throw the error for the component to handle
    }
  }


  createUser(username: string, email: string, password: string){
    this.hasClicked = true
    this.http.post<AuthResponse>(`${this.protocol}://${this.hostname}/api/crud/createUser`, {username: username, email: email, password: password}).subscribe((data) => {
      if (data.result === "User created successfully") {
        this.signupError = false
        localStorage.setItem('username', username);
        this.router.navigate(['/home/verifyEmail']);
      }
      this.hasClicked = false
    }, (error) =>{
      console.error('Error during login:', error);
      this.signupError = true
      this.hasClicked = false
    });
  }

  loginUser(email: string, password: String) {
    this.hasClicked = true
    this.http.post<VerifyResponse>(`${this.protocol}://${this.hostname}/api/auth/login`, { email: email, password: password }).subscribe((data) => {
      if (data.result === "User verified") {
        localStorage.setItem("isLogged", "true");
        this.cookieService.set('accessToken', data.accessToken, { path: '/', domain: this.hostname });
        this.cookieService.set('refreshToken', data.refreshToken, { path: '/', domain: this.hostname});
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", email);
        this.router.navigate(['/home/afterLogin']);
        this.loginError = false

      }else {
        this.loginError = true
      }
      this.hasClicked = false
    },(error) => {
      console.error('Error during login:', error);
      this.loginError = true
      this.hasClicked = false
    });
  }

  logout(){
    localStorage.clear()
    this.cookieService.delete('accessToken', '/', this.hostname);
    this.cookieService.delete('refreshToken', '/', this.hostname);
  }

  refreshAccessToken(){
    this.http.get<refreshAccessTokenResponse>(`${this.protocol}://${this.hostname}/api/auth/login`).subscribe((data) => {
      if (data.result === "New access token created") {
        localStorage.setItem("isLogged", "true");
        this.cookieService.delete('accessToken', '/', this.hostname);
        this.cookieService.set('accessToken', data.accessToken, { path: '/', domain: this.hostname });
      }else
      this.router.navigate(['/login']);
    })
  }
}
