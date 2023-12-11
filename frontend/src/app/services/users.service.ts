import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/users/login', formValue)
    );
  }

  register(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/users/register', formValue)
    );
  }

  verifyEmail(token: string, id: string) {
    return firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/users/verify/${token}/${id}`)
    );
  }

  sendRestorePassEmail(email: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/users/password/restore', {
        email: email,
      })
    );
  }

  restorePass(email: string, password: string) {
    return firstValueFrom(
      this.http.post<any>(
        AppConfig.baseUrl + `/users/password/restore/${email}`,
        { password: password }
      )
    );
  }
  isAdmin(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  isUser(): boolean {
    return localStorage.getItem('user') == 'true' ? true : false;
  }
}
