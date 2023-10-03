import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  itemForm: FormGroup;
  selectedFile: File | null = null;

  currentTags: string[] = [];
  tags: Tag[] = [];
  provTags: Tag[] = [];

  imageSrc: string | ArrayBuffer | null = null;

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
        (tag) => !this.currentTags.includes(tag.tagname)
      );
    });
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);

      const imgData = new FormData();
      imgData.append('image', this.selectedFile!);
      const imageRes = await this.itemsService.addItemImage(imgData);
      this.itemForm.get('imagelink')?.setValue(imageRes.url);

      const response = await this.itemsService.addItem(this.itemForm.value);
      console.log(response);
      this.itemForm.reset();
      this.imageSrc = null;
      this.currentTags = [];
    } else {
      this.isValid = false;
    }
  }

  onTagSelect(tagname: any) {
    this.currentTags.push(tagname.value);
    this.tags = this.provTags.filter(
      (tag) => !this.currentTags.includes(tag.tagname)
    );
  }

  onTagDelete(tagname: string) {
    this.currentTags = this.currentTags.filter((tag) => tag !== tagname);
    this.tags = this.provTags.filter(
      (tag) => !this.currentTags.includes(tag.tagname)
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
