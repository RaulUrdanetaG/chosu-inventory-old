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
      this.http.post<any>(AppConfig.baseUrl + 'users/login', formValue)
    );
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
