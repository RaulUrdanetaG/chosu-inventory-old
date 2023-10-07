import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/locations'));
  }
}
