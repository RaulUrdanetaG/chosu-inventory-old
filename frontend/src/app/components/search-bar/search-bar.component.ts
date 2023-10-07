import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SearchBarComponent {
  tags: Tag[] | undefined;
  owners: Owner[] | undefined;
  currentFilter: string = '';

  isDroppedDown: boolean = false;

  constructor(
    public tagsService: TagsService,
    public usersService: UsersService,
    public itemsService: ItemsService,
    public ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    this.tagsService.setTags();
    this.ownersService.setOwners();
    // subscribes to any changes on the tags var in tags service
    this.tagsService.tags$.subscribe((tags) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.tags = tags;
    });

    // subscribes to any changes on the tags var in tags service
    this.ownersService.owners$.subscribe((owners) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.owners = owners;
    });
  }

  async selectTag(tag: Tag) {
    this.itemsService.getItemsWithTag(tag.tagname);
    this.currentFilter = tag.tagname;
    this.isDroppedDown = false;
  }

  async selectOwner(owner: Owner) {
    this.itemsService.getItemsWithOwner(owner.owner);
    this.currentFilter = owner.owner;
    this.isDroppedDown = false;
  }

  async selectLocation(location: string) {
    this.itemsService.getItemsWithLocation(location);
    this.currentFilter = location;
    this.isDroppedDown = false;
  }

  editTag(tag: Tag) {
    this.tagsService.setSelectedTag(tag);
    this.tagsService.isUpdateTagModal = true;
  }

  deleteTagModal(tag: Tag) {
    this.tagsService.setSelectedTag(tag);
    this.tagsService.isDeleteTagModal = true;
  }

  

  editOwner(owner: Owner) {
    this.ownersService.setSelectedOwner(owner);
    this.ownersService.isUpdateOwnerModal = true;
  }

  deleteOwnerModal(owner: Owner) {
    this.ownersService.setSelectedOwner(owner);
    this.ownersService.isDeleteOwnerModal = true;
  }

  isLoading() {
    return this.tags?.length === 0 ? true : false;
  }
}
