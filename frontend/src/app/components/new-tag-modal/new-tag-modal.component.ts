import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tag } from 'src/app/interfaces/items';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-tag-modal',
  templateUrl: './new-tag-modal.component.html',
  styleUrls: ['./new-tag-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class NewTagModalComponent {
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

      // process input tag to maintain a word structure
      const porcessedTag = {
        tagname:
          this.form.value.tagname.charAt(0).toUpperCase() +
          this.form.value.tagname.slice(1).toLowerCase(),
      };

      // adds the new tag to the db
      const createRes = await this.tagsService.createTag(porcessedTag);

      // checks if the retrieved error is from existing tag
      if (createRes.errorTag) {
        this.tagExists = true;
        return;
      }
      this.tagExists = false;
      // updates the observable
      this.tagsService.setTags();
      this.tagsService.isNewTagModal = false;
    } else {
      this.isValid = false;
    }
  }
}
