import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { LocationService } from 'src/app/services/location.service';
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
  locations: any[] | undefined;
  currentFilter: string = '';

  isDroppedDown: boolean = false;

  public searchName: string = '';

  constructor(
    public tagsService: TagsService,
    public usersService: UsersService,
    public itemsService: ItemsService,
    public ownersService: OwnersService,
    public locationsService: LocationService,
    private elRef: ElementRef
  ) {}

  async ngOnInit() {
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

    this.locations = await this.locationsService.getLocations();
  }

  async showAllItems() {
    this.itemsService.getItems();
    this.currentFilter = '';
    this.isDroppedDown = false;
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

  async searchByName(name: string) {
    this.itemsService.getItemsWithName(name);
    this.currentFilter = name;
    this.isDroppedDown = false;
  }

  onType(search: string) {
    this.searchName = search;
  }

  isLoading() {
    return this.tags?.length === 0 ? true : false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // check if clicks outside of the component
    if (!this.elRef.nativeElement.contains(event.target)) {
      // if click is outside of component
      this.isDroppedDown = false;
    }
  }
}
