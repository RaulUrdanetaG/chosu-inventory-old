import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/items';
import { Tag } from 'src/app/interfaces/tags';
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

  constructor(
    private itemsService: ItemsService,
    public tagsService: TagsService,
    public usersService: UsersService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.itemsService.currentItems$.subscribe((items) => {
      this.itemsResponse = items;
    });
    await this.itemsService.getItems();
  }

  editItem(item: Item) {
    this.itemsService.setSelectedItem(item);
    this.router.navigate([`/items/updateItem/${item._id}`]);
  }

  isLoading() {
    return this.itemsResponse ? false : true;
  }
}
