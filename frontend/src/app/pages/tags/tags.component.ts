import { Component } from '@angular/core';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  tags: Tag[] | undefined;
  owners: Owner[] | undefined;
  activeButton: string | undefined;

  constructor(
    public tagsService: TagsService,
    public usersService: UsersService,
    public itemsService: ItemsService,
    public ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    this.activeButton = '';
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
    this.activeButton = tag.tagname;
    this.tagsService.setSelectedTag(tag);
  }

  editTag(tag: Tag) {
    this.tagsService.setSelectedTag(tag);
    this.tagsService.isUpdateTagModal = true;
  }

  deleteTagModal(tag: Tag) {
    this.tagsService.setSelectedTag(tag);
    this.tagsService.isDeleteTagModal = true;
  }

  async selectOwner(owner: Owner) {
    this.activeButton = owner.owner;
    this.ownersService.setSelectedOwner(owner);
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
