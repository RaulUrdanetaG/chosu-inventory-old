import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/items';
import { Location } from 'src/app/interfaces/locations';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { LocationService } from 'src/app/services/location.service';
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
  currentLocation!: Location;
  isLoading: boolean = false;

  constructor(
    public tagsService: TagsService,
    public ownersService: OwnersService,
    public itemsService: ItemsService,
    public locationsService: LocationService,
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

    this.locationsService.SelectedLocation$.subscribe((location) => {
      this.currentLocation = location;
    });
  }

  async deleteTag() {
    this.isLoading = true;
    const deletedTag = await this.tagsService.deleteTag(this.currentTag);
    this.tagsService.setTags();
    this.tagsService.isDeleteTagModal = false;
    this.isLoading = false;
  }

  async deleteOwner() {
    this.isLoading = true;
    const deletedOwner = await this.ownersService.deleteOwner(
      this.currentOwner
    );
    this.ownersService.setOwners();
    this.ownersService.isDeleteOwnerModal = false;
    this.isLoading = false;
  }

  async deleteLocation() {
    this.isLoading = true;
    const deletedLocation = await this.locationsService.deleteLocation(
      this.currentLocation
    );
    this.locationsService.setLocations();
    this.locationsService.isDeleteLocationModal = false;
    this.isLoading = false;
  }

  async deleteItem() {
    this.isLoading = true;
    const deletedItem = await this.itemsService.deleteItem(
      this.currentItem._id
    );
    this.itemsService.isDeleteItemModal = false;
    this.router.navigate(['/items/all']);
    this.isLoading = false;
  }
}
