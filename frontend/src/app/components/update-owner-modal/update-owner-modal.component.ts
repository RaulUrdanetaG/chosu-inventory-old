import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Owner } from 'src/app/interfaces/owners';
import { OwnersService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-update-owner-modal',
  templateUrl: './update-owner-modal.component.html',
  styleUrls: ['./update-owner-modal.component.css'],
})
export class UpdateOwnerModalComponent implements AfterViewInit {
  @ViewChild('updateOwnerInput') updateOwnerInput: ElementRef | undefined;

  form: FormGroup;
  isValid: boolean = true;
  tagExists: boolean = false;
  currentOwner: Owner = { _id: '', owner: '' };

  isLoading: boolean = false;

  constructor(public ownersService: OwnersService) {
    this.form = new FormGroup({
      owner: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.ownersService.SelectedOwner$.subscribe((owner) => {
      this.currentOwner = owner;
      this.form.get('owner')?.setValue(owner.owner);
    });
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      this.isValid = true;

      // process input tag to maintain a structure for the update, and sedns previous tag to know wich tag to update
      const processedOwner = {
        _id: this.currentOwner?._id,
        owner:
          this.form.value.owner.charAt(0).toUpperCase() +
          this.form.value.owner.slice(1).toLowerCase(),
        prevOwner: this.currentOwner.owner,
      };

      // updates the tag in the tags and items db
      await this.ownersService.updateOwner(processedOwner);

      this.ownersService.setOwners();
      this.ownersService.isUpdateOwnerModal = false;
    } else {
      this.isValid = false;
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.updateOwnerInput?.nativeElement.focus();
  }
}
