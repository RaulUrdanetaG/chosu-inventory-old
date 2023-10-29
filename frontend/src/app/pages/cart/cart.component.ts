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
  constructor(
    private cartService: CartService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.cartService.currentCart$.subscribe((currentCart) => {
      this.cart = currentCart;

      this.cart.forEach(async (item) => {
        let currItem = await this.itemsService.getItem(item);
        this.items.push(currItem);
      });

    });
    this.cartService.getCart();
  }
}
