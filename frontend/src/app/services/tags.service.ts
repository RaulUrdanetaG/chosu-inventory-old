import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  isModal: boolean = false;

  constructor(private http: HttpClient) {}

  getTags() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/tags'));
  }
}
