import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class NewModalComponent {
  @ViewChild('newOwnerInput') newOwnerInput: ElementRef | undefined;
  @ViewChild('newTagInput') newTagInput: ElementRef | undefined;

  tagForm: FormGroup;
  ownerForm: FormGroup;
  isValid: boolean = true;
  exists: boolean = false;
  isLoading: boolean = false;

  constructor(
    public ownersService: OwnersService,
    public tagsService: TagsService
  ) {
    this.ownerForm = new FormGroup({
      owner: new FormControl(),
    });
    this.tagForm = new FormGroup({
      tagname: new FormControl(),
    });
  }

  async onSubmitOwner() {
    this.isLoading = true;
    if (this.ownerForm.valid) {
      this.isValid = true;

      // adds the new tag to the db
      const createRes = await this.ownersService.createOwner(
        this.ownerForm.value
      );

      // checks if the retrieved error is from existing tag
      if (createRes.errorOwner) {
        this.isValid = true;
        this.exists = true;
        this.isLoading = false;
        return;
      }
      this.exists = false;
      // updates the observable
      this.ownersService.setOwners();
      this.ownersService.isNewOwnerModal = false;
    } else {
      this.exists = false;
      this.isValid = false;
    }
    this.isLoading = false;
  }

  async onSubmitTag() {
    this.isLoading = true;
    if (this.tagForm.valid) {
      this.isValid = true;

      // adds the new tag to the db
      const createRes = await this.tagsService.createTag(this.tagForm.value);
      // checks if the retrieved error is from existing tag
      if (createRes.errorTag) {
        this.isValid = true;
        this.exists = true;
        this.isLoading = false;
        return;
      }
      this.exists = false;
      // updates the observable
      this.tagsService.setTags();
      this.tagsService.isNewTagModal = false;
    } else {
      this.exists = false;
      this.isValid = false;
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.newOwnerInput?.nativeElement.focus();
    this.newTagInput?.nativeElement.focus();
  }
}
