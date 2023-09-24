import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  base_URL = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}

  login(formValue: any) {
    return firstValueFrom(
      this.http.post<any>(this.base_URL + '/login', formValue)
    );
  }
}
