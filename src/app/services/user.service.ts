import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface resultResponse {
  result: string;

}
interface resultEmailAndUsernameResponse {
  username: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  changeProfilePicture(picture: File): Observable<resultResponse> {
    this.auth.checkAccessToken()
    const formData = new FormData();
    formData.append('image', picture);
    return this.http.post<resultResponse>(
      `${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/images/uploadProfileImage`, formData, { withCredentials: true });
  }

  getChangePasswordToken(email: string): Observable<resultResponse> {
    return this.http.post<resultResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/getChangePasswordToken`, { email: email }, { withCredentials: true });
  }

  changePassword(token: string, password: string): Observable<resultResponse> {
    return this.http.put<resultResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/updateUserPassword/${token}`, { password: password }, { withCredentials: true });
  }

  changeUsername(username: string): Observable<resultResponse> {
    return this.http.put<resultResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/changeUsername`, { username: username }, { withCredentials: true });
  }

  getChangeEmailToken(email: string, password: string): Observable<resultResponse> {
    return this.http.post<resultResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/getChangeEmailToken`, { email: email, password: password }, { withCredentials: true });
  }

  changeEmail(token: string, oldEmail: string, newEmail: string): Observable<resultResponse> {
    return this.http.put<resultResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/updateUserEmail/${token}`, { oldEmail: oldEmail, newEmail: newEmail }, { withCredentials: true });
  }

  checkPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  getUsernameAndEmail(): Observable<resultEmailAndUsernameResponse> {
    return this.http.get<resultEmailAndUsernameResponse>(`${this.auth.protocolGetter}://${this.auth.hostnameGetter}/api/crud/getUsernameAndEmail`, { withCredentials: true });
  }

}
