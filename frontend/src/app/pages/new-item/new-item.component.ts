import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  itemForm: FormGroup;
  currentTags: string[] = [];
  tags: string[] = [];
  provTags: string[] = [];
  isValid: boolean = true;

  constructor(
    private itemsService: ItemsService,
    public tagsService: TagsService
  ) {
    this.itemForm = new FormGroup({
      name: new FormControl(),
      imagelink: new FormControl(),
      price: new FormControl(),
      boughtAt: new FormControl(),
      location: new FormControl(),
      tags: new FormControl(),
    });
  }

  ngOnInit() {
    this.tagsService.setTags();
    // subscribes to any changes on the tags var in tags service
    this.tagsService.tags$.subscribe((tags) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.tags = this.provTags = tags.filter(
        (tag) => !this.currentTags.includes(tag)
      );
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);
      this.itemForm.get('imagelink')?.setValue('');

      this.itemsService.addItem(this.itemForm.value);
      this.itemForm.reset();
      this.currentTags = [];
    } else {
      this.isValid = false;
    }
  }

  onTagSelect(tagname: any) {
    this.currentTags.push(tagname.value);
    this.tags = this.provTags.filter((tag) => !this.currentTags.includes(tag));
  }

  onTagDelete(tagname: string) {
    this.currentTags = this.currentTags.filter((tag) => tag !== tagname);
    this.tags = this.provTags.filter((tag) => !this.currentTags.includes(tag));
  }
}
