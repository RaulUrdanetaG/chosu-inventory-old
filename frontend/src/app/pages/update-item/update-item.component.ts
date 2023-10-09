import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { LocationService } from 'src/app/services/location.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent {
  itemForm: FormGroup;
  selectedFile: File | null = null;

  currentTags: string[] = [];
  tags: Tag[] = [];
  provTags: Tag[] = [];

  owners: Owner[] = [];

  locations: any[] = [];

  currentItem: any;
  currentId: string = '';

  imageSrc: string | ArrayBuffer | null = null;

  isValid: boolean = true;
  isUploading: boolean = false;
  isUploaded: boolean = true;

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
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
    });
  }

  async ngOnInit() {
    this.tagsService.setTags();
    this.ownersService.setOwners();
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

    this.locations = await this.locationsService.getLocations();

    this.activatedRoute.params.subscribe((params) => {
      this.currentId = params['itemId'];
    });
    // Recieves current item
    this.itemsService.selectedItem$.subscribe((item) => {
      // Creates a copy of the current item
      this.currentItem = { ...item };
      // removes _id and __v for it to fit in item Form
      delete this.currentItem._id;
      delete this.currentItem.__v;
      // takes the current item values and puts it in the form
      this.itemForm.setValue(this.currentItem);
      this.currentTags = item.tags;
      // filters the tags that were already added for them to not appear in the select input
      this.tags = this.provTags.filter(
        (tag) => !this.currentTags.includes(tag.tagname)
      );
    });
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.isUploading = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);

      // check if a file was submited
      if (this.selectedFile !== null) {
        const imgData = new FormData();
        imgData.append('image', this.selectedFile!);
        // uploads image to google cloud
        const imageRes = await this.itemsService.addItemImage(imgData);
        // sets google cloud link to the form
        this.itemForm.get('imagelink')?.setValue(imageRes.url);
      } else {
        // if theres not a new image fill the form with the current image link
        this.itemForm.get('imagelink')?.setValue(this.currentItem.imagelink);
      }
      // updates item
      const response = await this.itemsService.updateItem(
        this.currentId,
        this.itemForm.value
      );
      if (response.error) {
        this.isUploaded = false;
        return;
      }
      this.itemForm.reset();
      this.imageSrc = null;
      this.currentTags = [];
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
