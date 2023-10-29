import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';
import { Item } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  isDeleteItemModal: boolean = false;
  isItemsLoading: boolean = false;

  private _items = new BehaviorSubject<Item[]>([]);
  currentItems$ = this._items.asObservable();

  private _selectedItem = new BehaviorSubject<Item>({
    _id: '',
    name: '',
    imagelink: '',
    price: 0,
    boughtAt: 0,
    location: '',
    owner: '',
    tags: [],
  });
  selectedItem$ = this._selectedItem.asObservable();

  constructor(private http: HttpClient) {}

  async getItems() {
    this._items.next([]);
    this.isItemsLoading = true;
    const itemsResponse = await firstValueFrom(
      this.http.get<Item[]>(AppConfig.baseUrl + '/items')
    );
    this.isItemsLoading = false;
    return this._items.next(itemsResponse);
  }

  async getItemsWithTag(tagname: string) {
    this._items.next([]);
    this.isItemsLoading = true;
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?tag=${tagname}`)
    );
    this.isItemsLoading = false;
    return this._items.next(itemsResponse);
  }

  async getItemsWithOwner(owner: string) {
    this._items.next([]);
    this.isItemsLoading = true;
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?owner=${owner}`)
    );
    this.isItemsLoading = false;
    return this._items.next(itemsResponse);
  }

  async getItemsWithLocation(location: string) {
    this._items.next([]);
    this.isItemsLoading = true;
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?location=${location}`)
    );
    this.isItemsLoading = false;
    return this._items.next(itemsResponse);
  }

  async getItemsWithName(name: string) {
    this._items.next([]);
    this.isItemsLoading = true;
    const itemsResponse = await firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items?name=${name}`)
    );
    this.isItemsLoading = false;
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

  getItem(itemId: string) {
    return firstValueFrom(
      this.http.get<any>(AppConfig.baseUrl + `/items/${itemId}`)
    );
  }

  updateItem(itemId: string, item: Item) {
    return firstValueFrom(
      this.http.put<any>(AppConfig.baseUrl + `/items/${itemId}`, item)
    );
  }

  deleteItem(itemId: string) {
    return firstValueFrom(
      this.http.delete<any>(AppConfig.baseUrl + `/items/${itemId}`)
    );
  }

  setSelectedItem(item: Item) {
    return this._selectedItem.next(item);
  }
}
