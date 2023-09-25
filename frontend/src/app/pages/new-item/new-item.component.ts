import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/interfaces/items';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  itemForm: FormGroup;
  currentTags: string[] = [];
  tags: String[] = [];
  isValid: boolean = true;

  constructor(private itemsService: ItemsService) {
    this.itemForm = new FormGroup({
      name: new FormControl(),
      imagelink: new FormControl(),
      price: new FormControl(),
      location: new FormControl(),
      tags: new FormControl(),
    });
  }

  async ngOnInit() {
    const resTags = await this.itemsService.getTags();

    resTags.forEach((tag: Tag) => {
      this.tags.push(tag.tagname);
    });
    console.log(this.tags);
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);
      this.itemForm.get('imagelink')?.setValue('');

      this.itemsService.addItem(this.itemForm.value);
    } else {
      this.isValid = false;
    }
  }

  onTagSelect(tagname: any) {
    this.currentTags.push(tagname.value);
    this.tags = this.tags?.filter((tag) => tag !== tagname.value);
  }

  onTagDelete(tagname: string) {
    this.currentTags = this.currentTags.filter((tag) => tag !== tagname);
    this.tags.push(tagname);
  }
}
