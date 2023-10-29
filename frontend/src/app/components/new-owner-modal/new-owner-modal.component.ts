import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwnersService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-new-owner-modal',
  templateUrl: './new-owner-modal.component.html',
  styleUrls: ['./new-owner-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class NewOwnerModalComponent implements AfterViewInit {
  @ViewChild('newOwnerInput') newOwnerInput: ElementRef | undefined;

  form: FormGroup;
  isValid: boolean = true;
  tagExists: boolean = false;
  isLoading: boolean = false;

  constructor(public ownersService: OwnersService) {
    this.form = new FormGroup({
      owner: new FormControl(),
    });
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      this.isValid = true;

      // adds the new tag to the db
      const createRes = await this.ownersService.createOwner(this.form.value);

      // checks if the retrieved error is from existing tag
      if (createRes.errorOwner) {
        this.isValid = true;
        this.tagExists = true;
        this.isLoading = false;
        return;
      }
      this.tagExists = false;
      // updates the observable
      this.ownersService.setOwners();
      this.ownersService.isNewOwnerModal = false;
    } else {
      this.tagExists = false;
      this.isValid = false;
    }
    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.newOwnerInput?.nativeElement.focus();
  }
}
