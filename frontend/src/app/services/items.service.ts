import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';
import { Item } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl));
  }

  getTags() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/tags'));
  }

  addItem(item: Item) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/addItem', item)
    );
  }
}
