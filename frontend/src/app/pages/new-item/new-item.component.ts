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
  tags: Tag[] | undefined;

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
    this.tags = await this.itemsService.getTags();
    console.log(this.tags);
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.itemForm.get('tags')?.setValue(this.currentTags);
      this.itemForm.get('imagelink')?.setValue('');

      this.itemsService.addItem(this.itemForm.value);
    } else {
    }
  }

  onTagSelect(tagname: any) {
    this.currentTags.push(tagname.value);
    this.tags = this.tags?.filter((tag) => tag.tagname !== tagname.value);
    console.log(this.currentTags);
  }
}
