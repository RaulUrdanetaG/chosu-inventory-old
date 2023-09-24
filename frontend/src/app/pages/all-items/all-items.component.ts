import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit {
  items: any = [];

  constructor(private itemsService: ItemsService) {}

  async ngOnInit() {
    this.items = await this.itemsService.getAll();
    console.log(this.items);
  }
}
