import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';
import { Item } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private _items = new BehaviorSubject<Item[]>([]);
  curretnItems$ = this._items.asObservable();

  constructor(private http: HttpClient) {}

  async getItems() {
    const itemsResponse = await firstValueFrom(
      this.http.get<Item[]>(AppConfig.baseUrl + '/items')
    );
    return this._items.next(itemsResponse);
  }

  async getItemsWithTag(tagname: string) {
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?tag=${tagname}`)
    );
    return this._items.next(itemsResponse);
  }

  async getItemsWithOwner(owner: string) {
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?owner=${owner}`)
    );
    return this._items.next(itemsResponse);
  }

  async getItemsWithLocation(location: string) {
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?location=${location}`)
    );
    return this._items.next(itemsResponse);
  }

  async getItemsWithName(name: string) {
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?name=${name}`)
    );
    return this._items.next(itemsResponse);
  }

  addItem(item: Item) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/items/addItem', item)
    );
  }

  addItemImage(image: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/images/upload', image)
    );
  }
}
