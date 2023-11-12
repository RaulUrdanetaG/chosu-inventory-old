import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/interfaces/owners';
import { Tag } from 'src/app/interfaces/tags';
import { ItemsService } from 'src/app/services/items.service';
import { LocationService } from 'src/app/services/location.service';
import { OwnersService } from 'src/app/services/owners.service';
import { TagsService } from 'src/app/services/tags.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent {
  itemForm: FormGroup;

  currentTags: string[] = [];
  tags: Tag[] = [];
  provTags: Tag[] = [];

  owners: Owner[] = [];

  locations: any[] = [];

  currentItem: any;
  currentId: string = '';

  imageSrcs: string[] = [];
  selectedFiles: File[] = [];

  touchStartIndex: number = 0;

  isValid: boolean = true;
  isUploading: boolean = false;
  isUploaded: boolean = true;

  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public itemsService: ItemsService,
    public tagsService: TagsService,
    public ownersService: OwnersService,
    public locationsService: LocationService,
    private router: Router
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
    });
  }

  async ngOnInit() {
    this.isLoading = true;
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

    this.locationsService.locations$.subscribe((locations) => {
      this.locations = locations;
    });

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
      this.imageSrcs = this.currentItem.imagelink;
      this.currentTags = item.tags;
      // filters the tags that were already added for them to not appear in the select input
      this.tags = this.provTags.filter(
        (tag) => !this.currentTags.includes(tag.tagname)
      );
    });
    this.isLoading = false;
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      this.isValid = true;
      this.isUploading = true;
      this.itemForm.get('tags')?.setValue(this.currentTags);
      console.log(this.imageSrcs);
      // check if a file was submited
      if (this.selectedFiles.length !== 0) {
        const imgData = new FormData();
        this.selectedFiles.forEach((file) => imgData.append('image', file));

        // uploads image to google cloud
        const imageRes = await this.itemsService.addItemImage(imgData);
        console.log('before', this.imageSrcs);
        // checks indexes where theres data info instead of a link
        let dataIndexes: number[] = [];
        this.imageSrcs.forEach((element, index) => {
          if (element.startsWith('data')) {
            dataIndexes.push(index);
          }
        });
        // changes info in those indexes to the generated links
        dataIndexes.forEach((index, i) => {
          this.imageSrcs[index] = imageRes.urls[i];
        });
        console.log('after', this.imageSrcs);
        this.itemForm.get('imagelink')?.setValue(this.imageSrcs);
      } else {
        this.itemForm.get('imagelink')?.setValue(this.imageSrcs);
      }
      // updates item
      const response = await this.itemsService.updateItem(
        this.currentId,
        this.itemForm.value
      );
      console.log(response);
      if (response.error) {
        this.isUploaded = false;
        return;
      }
      this.router.navigate(['/items/all']);
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
