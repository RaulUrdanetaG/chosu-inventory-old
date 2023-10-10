import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/items';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css'],
})
export class ConfirmDeleteModalComponent implements OnInit {
  currentTag!: Tag;
  currentOwner!: Owner;
  currentItem!: Item;

  constructor(
    public tagsService: TagsService,
    public ownersService: OwnersService,
    public itemsService: ItemsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tagsService.SelectedTag$.subscribe((tag) => {
      this.currentTag = tag;
    });

    this.ownersService.SelectedOwner$.subscribe((owner) => {
      this.currentOwner = owner;
    });

    this.itemsService.selectedItem$.subscribe((item) => {
      this.currentItem = item;
    });
  }

  async deleteTag() {
    const deletedTag = await this.tagsService.deleteTag(this.currentTag);
    this.tagsService.setTags();
    this.tagsService.isDeleteTagModal = false;
  }

  async deleteOwner() {
    const deletedOwner = await this.ownersService.deleteOwner(
      this.currentOwner
    );
    this.ownersService.setOwners();
    this.ownersService.isDeleteOwnerModal = false;
  }

  async deleteItem() {
    console.log(this.currentItem._id);
    const deletedItem = await this.itemsService.deleteItem(
      this.currentItem._id
    );
    console.log(deletedItem);
    this.itemsService.isDeleteItemModal = false;
    this.router.navigate(['/items/all']);
  }
}
