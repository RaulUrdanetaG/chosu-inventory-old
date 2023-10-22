import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-tag-modal',
  templateUrl: './new-tag-modal.component.html',
  styleUrls: ['./new-tag-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class NewTagModalComponent implements AfterViewInit {
  @ViewChild('newTagInput') newTagInput: ElementRef | undefined;

  form: FormGroup;
  isValid: boolean = true;
  tagExists: boolean = false;

  constructor(public tagsService: TagsService) {
    this.form = new FormGroup({
      tagname: new FormControl(),
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isValid = true;

      // adds the new tag to the db
      const createRes = await this.tagsService.createTag(this.form.value);

      // checks if the retrieved error is from existing tag
      if (createRes.errorTag) {
        this.isValid = true;
        this.tagExists = true;
        return;
      }
      this.tagExists = false;
      // updates the observable
      this.tagsService.setTags();
      this.tagsService.isNewTagModal = false;
    } else {
      this.tagExists = false;
      this.isValid = false;
    }
  }

  ngAfterViewInit(): void {
    this.newTagInput?.nativeElement.focus();
  }
}
