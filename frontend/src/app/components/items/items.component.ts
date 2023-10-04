import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/items';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ItemsComponent implements OnInit {
  itemsResponse: Item[] | undefined;
  currentTag!: Tag;

  constructor(
    private itemsService: ItemsService,
    public tagsService: TagsService
  ) {}

  ngOnInit() {
    console.log(this.itemsResponse);
    this.tagsService.setSelectedTag({ _id: '', tagname: '' });
    this.tagsService.SelectedTag$.subscribe(async (tag) => {
      this.currentTag = tag;
      this.itemsResponse = undefined;
      this.itemsResponse = await this.itemsService.getItemsWithFilter(
        tag.tagname
      );
      console.log(this.itemsResponse);
    });
  }

  isLoading() {
    return this.itemsResponse ? false : true;
  }
}
