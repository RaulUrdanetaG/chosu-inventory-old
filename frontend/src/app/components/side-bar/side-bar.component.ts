import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SideBarComponent implements OnInit {
  tags: string[] = [];
  activeButton: string | undefined;

  constructor(
    public tagsService: TagsService,
    public usersService: UsersService,
    public itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.activeButton = '';
    this.tagsService.setTags();
    // subscribes to any changes on the tags var in tags service
    this.tagsService.tags$.subscribe((tags) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.tags = tags;
    });
  }

  async selectTag(tag: string) {
    this.activeButton = tag;
    this.tagsService.setSelectedTag(tag);
  }

  isLoading() {
    return this.tags[0] == '' ? false : true;
  }
}
