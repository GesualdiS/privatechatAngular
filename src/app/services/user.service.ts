import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface resultResponse {

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

}
