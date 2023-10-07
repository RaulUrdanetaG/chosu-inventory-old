import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
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
  constructor(
    public tagsService: TagsService,
    public ownersService: OwnersService
  ) {}

  ngOnInit(): void {
    this.tagsService.SelectedTag$.subscribe((tag) => {
      this.currentTag = tag;
    });

    this.ownersService.SelectedOwner$.subscribe((owner) => {
      this.currentOwner = owner;
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
}
