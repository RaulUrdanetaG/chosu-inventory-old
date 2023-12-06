import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/items';
import { CartService } from 'src/app/services/cart.service';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ItemsComponent implements OnInit {
  itemsResponse: Item[] | undefined;
  cart: string[] = [];

  constructor(
    public itemsService: ItemsService,
    public tagsService: TagsService,
    public usersService: UsersService,
    private cartService: CartService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.itemsService.isItemsLoading = true;
    this.itemsService.currentItems$.subscribe((items) => {
      this.itemsResponse = items;
    });
    await this.itemsService.getItems();
    if (this.usersService.isUser()) {
      this.cartService.currentCart$.subscribe((currentCart) => {
        this.cart = currentCart;
      });
      await this.cartService.getCart();
    }

    this.itemsService.isItemsLoading = false;
  }

  editItem(item: Item) {
    this.itemsService.setSelectedItem(item);
    this.router.navigate([`/items/updateItem/${item._id}`]);
  }

  async addToCart(item: Item) {
    if (!this.usersService.isUser()) {
      this.router.navigate(['users/login']);
    }
    this.cart.push(item._id);
    await this.cartService.updateCart(this.cart);
  }

  async toggleSold(item: Item) {
    const response = await this.itemsService.updateItem(item._id, {
      sold: !item.sold,
    });
    this.itemsService.getItems();
  }

  showCarousel(item: Item) {
    this.itemsService.setSelectedItem(item);
    this.itemsService.isImageCarousel = true;
  }
  isLoading() {
    return this.itemsResponse?.length === 0 && this.itemsService.isItemsLoading
      ? true
      : false;
  }
}
