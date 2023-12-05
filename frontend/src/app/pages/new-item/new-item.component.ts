import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { LocationService } from 'src/app/services/location.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  itemForm: FormGroup;

  currentTags: string[] = [];
  tags: Tag[] = [];
  provTags: Tag[] = [];

  owners: Owner[] = [];

  locations: any[] = [];

  selectedFiles: File[] = [];
  imageSrcs: string[] = [];

  isValid: boolean = true;
  isUploading: boolean = false;
  isUploaded: boolean = true;

  constructor(
    private itemsService: ItemsService,
    public tagsService: TagsService,
    public ownersService: OwnersService,
    public locationsService: LocationService
  ) {
    this.itemForm = new FormGroup({
      name: new FormControl(),
      imagelink: new FormControl(),
      price: new FormControl(),
      boughtAt: new FormControl(),
      location: new FormControl(),
      tags: new FormControl(),
      owner: new FormControl(),
      description: new FormControl(),
      date: new FormControl(),
      sold: new FormControl(),
    });
  }

  async ngOnInit() {
    this.tagsService.setTags();
    this.ownersService.setOwners();
    this.locationsService.setLocations();
    // subscribes to any changes on the tags var in tags service
    this.tagsService.tags$.subscribe((tags) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.tags = this.provTags = tags.filter(
        (tag) => !this.currentTags.includes(tag.tagname)
      );
    });

    // subscribes to any changes on the tags var in tags service
    this.ownersService.owners$.subscribe((owners) => {
      // sets initial list, and saves all retrieved tags in a provitional array
      this.owners = owners;
    });

    this.locationsService.locations$.subscribe((locations) => {
      this.locations = locations;
    });
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.isUploading = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);

      // check if a file was submited
      if (this.selectedFiles !== null) {
        const imgData = new FormData();
        this.selectedFiles.forEach((file) => imgData.append('image', file));

        // uploads image to google cloud
        const imageRes = await this.itemsService.addItemImage(imgData);
        this.itemForm.get('imagelink')?.setValue(imageRes.urls);
      } else {
        this.itemForm.get('imagelink')?.setValue('');
      }

      this.itemForm.get('date')?.setValue(Date());
      this.itemForm.get('sold')?.setValue(false);

      const response = await this.itemsService.addItem(this.itemForm.value);

      if (response.error) {
        this.isUploaded = false;
        return;
      }
      this.itemForm.reset();
      this.imageSrcs = [];
      this.currentTags = [];
      this.selectedFiles = [];
      this.tags = this.provTags;
      this.isUploading = false;
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
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!;
      this.selectedFiles.push(file);

      if (file) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.imageSrcs.push(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imageSrcs.splice(index, 1);
  }

  shiftRight() {
    const firstElement = this.imageSrcs.shift();
    this.imageSrcs.push(firstElement!);
  }

  shiftLeft() {
    const lastElement = this.imageSrcs.pop();
    this.imageSrcs.unshift(lastElement!);
  }
}
