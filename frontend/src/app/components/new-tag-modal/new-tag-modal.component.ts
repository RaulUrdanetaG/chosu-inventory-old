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

  constructor(public tagsService: TagsService) {
    this.form = new FormGroup({
      tagname: new FormControl(),
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isValid = true;
      // adds the new tag to the db
      await this.tagsService.createTag(this.form.value);
      // updates the observable
      this.tagsService.setTags();
      this.tagsService.isNewTagModal = false;
    } else {
      this.isValid = false;
    }
  }
}
