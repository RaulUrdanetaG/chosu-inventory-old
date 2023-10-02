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

  getItems() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/items'));
  }

  getItemsWithFilter(tagname: string) {
    return firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?tag=${tagname}`)
    );
  }

  addItem(item: Item) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/addItem', item)
    );
  }

  addItemImage(image: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/images/upload', image)
    );
  }
}
