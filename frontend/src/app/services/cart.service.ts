import { Injectable } from '@angular/core';
import { Item } from '../interfaces/items';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart = new BehaviorSubject<string[]>([]);
  currentCart$ = this._cart.asObservable();

  constructor(private http: HttpClient) {}

  async getCart() {
    this._cart.next([]);
    const userId = localStorage.getItem('id');
    const cart = await firstValueFrom(
      this.http.get<string[]>(AppConfig.baseUrl + `/users/cart/${userId}`)
    );
    this._cart.next(cart);
  }

  updateCart(items: string[]) {
    const userId = localStorage.getItem('id');
    return firstValueFrom(
      this.http.put<string[]>(AppConfig.baseUrl + `/users/cart/${userId}`, {
        cart: items,
      })
    );
  }
}
