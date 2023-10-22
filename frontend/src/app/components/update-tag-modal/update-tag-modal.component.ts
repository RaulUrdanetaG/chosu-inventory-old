import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/interfaces/tags';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-update-tag-modal',
  templateUrl: './update-tag-modal.component.html',
  styleUrls: ['./update-tag-modal.component.css'],
})
export class UpdateTagModalComponent implements OnInit, AfterViewInit {
  @ViewChild('updateTagInput') updateTagInput: ElementRef | undefined;

  form: FormGroup;
  isValid: boolean = true;
  tagExists: boolean = false;
  currentTag: Tag = { _id: '', tagname: '' };

  constructor(public tagsService: TagsService) {
    this.form = new FormGroup({
      tagname: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.tagsService.SelectedTag$.subscribe((tag) => {
      this.currentTag = tag;
      this.form.get('tagname')?.setValue(tag.tagname);
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      this.isValid = true;

      // process input tag to maintain a structure for the update, and sedns previous tag to know wich tag to update
      const porcessedTag = {
        _id: this.currentTag?._id,
        tagname:
          this.form.value.tagname.charAt(0).toUpperCase() +
          this.form.value.tagname.slice(1).toLowerCase(),
        prevTag: this.currentTag.tagname,
      };

      // updates the tag in the tags and items db
      await this.tagsService.updateTag(porcessedTag);

      this.tagsService.setTags();
      this.tagsService.isUpdateTagModal = false;
    } else {
      this.isValid = false;
    }
  }

  ngAfterViewInit(): void {
    this.updateTagInput?.nativeElement.focus();
  }
}
