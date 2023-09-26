import { Component } from '@angular/core';
import { TagsService } from './services/tags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'chosu-inventory-front';

  constructor(public tagsService: TagsService) {}
}
