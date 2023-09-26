import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit {
  items: any = [];
  tags: any = [];

  constructor(
    private itemsService: ItemsService,
    private tagsService: TagsService
  ) {}

  async ngOnInit() {
    this.items = await this.itemsService.getItems();
    this.tags = await this.tagsService.getTags();
  }
}
