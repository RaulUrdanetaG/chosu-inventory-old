import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SideBarComponent implements OnInit {
  tags: string[] = [];
  constructor(public tagsService: TagsService) {}
  ngOnInit(): void {
    this.tagsService.setTags();
    // subscribes to any changes on the tags var in tags service
    this.tagsService.tags$.subscribe((tags) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.tags = tags;
    });
  }
}
