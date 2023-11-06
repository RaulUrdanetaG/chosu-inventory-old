import { Component } from '@angular/core';
import { TagsService } from './services/tags.service';
import { OwnersService } from './services/owners.service';
import { ItemsService } from './services/items.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chosu-inventory-front';

  constructor(
    public tagsService: TagsService,
    public ownersService: OwnersService,
    public itemsService: ItemsService,
    public locationsService: LocationService
  ) {}
}
