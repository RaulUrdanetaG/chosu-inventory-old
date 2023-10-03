import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces/tags';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css'],
})
export class ConfirmDeleteModalComponent implements OnInit {
  currentTag!: Tag;
  constructor(public tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.SelectedTag$.subscribe((tag) => {
      this.currentTag = tag;
    });
  }

  async deleteTag() {
    const deletedTag = await this.tagsService.deleteTag(this.currentTag);
    this.tagsService.setTags();
    this.tagsService.isDeleteTagModal = false;
  }
}
