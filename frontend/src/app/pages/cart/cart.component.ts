import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/items';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { UsersService } from 'src/app/services/users.service';
import { AppConfig } from 'src/app/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: string[] = [];
  items: Item[] = [];

  whatsappCartLink: string = `${AppConfig.whatsappBase}?text=Hola!, estoy buscando comprar:`;

  totalPrice: number = 0;

  isLoadingItems: boolean = true;

  constructor(
    private cartService: CartService,
    private itemsService: ItemsService,
    public usersService: UsersService,
    private router: Router
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
      this.totalPrice = this.items.reduce((price, item) => {
        return price + item.price;
      }, 0);
      this.isLoadingItems = false;
    });
  }

  async deleteItem(item: Item) {
    // set default values to ensure loading screen appears
    this.isLoadingItems = true;
    this.items = [];

    this.cart = this.cart.filter((itemFilter) => itemFilter !== item._id);
    await this.cartService.updateCart(this.cart);
    this.cartService.getCart();
  }

  async buyCart() {
    this.cartService.getCart();
    this.items.forEach((item, index) => {
      this.whatsappCartLink += `%0A${index + 1}. ${item.name} - $${item.price}`;
    });

    this.cart = [];
    await this.cartService.updateCart(this.cart);
    this.router.navigate(['items/all']);
    window.open(`${this.whatsappCartLink}`, '_blank');
  }

  isLoading() {
    return this.items.length === 0 && this.isLoadingItems ? true : false;
  }
}
