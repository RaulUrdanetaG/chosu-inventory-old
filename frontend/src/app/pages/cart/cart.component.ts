import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/items';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: string[] = [];
  items: Item[] = [];

  isLoadingItems: boolean = true;

  constructor(
    private cartService: CartService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart();
    this.cartService.currentCart$.subscribe(async (currentCart) => {
      this.isLoadingItems = true;
      this.cart = currentCart;
      // makes all item requestes and store promises in a var
      const promises = this.cart.map((item) => this.itemsService.getItem(item));

      // resolve all promises in the same order
      this.items = await Promise.all(promises);
      this.isLoadingItems = false;
    });
  }

  async deleteItem(item: Item) {
    this.isLoadingItems = true;
    this.items = [];
    this.cart = this.cart.filter((itemFilter) => itemFilter !== item._id);
    await this.cartService.updateCart(this.cart);
    this.cartService.getCart();
  }

  isLoading() {
    return this.items.length === 0 && this.isLoadingItems ? true : false;
  }
}
