import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css'],
})
export class EnterEmailComponent {
  form: FormGroup;
  isValid: boolean = true;
  isLoading: boolean = false;
  isError: boolean = false;
  isSent: boolean = false;

  constructor(private router: Router, private usersService: UsersService) {
    this.form = new FormGroup({
      email: new FormControl(),
    });
  }
  async sendPassEmail() {
    this.isSent = false;
    this.isLoading = true;
    if (!this.form.valid) {
      this.isValid = false;
      this.isError = false;
      this.isLoading = false;
      return;
    }
    this.isValid = true;
    this.isError = false;
    const email = this.form.get('email')?.value;
    const response = await this.usersService.sendRestorePassEmail(email);

    if (response.error) {
      this.isError = true;
      this.isLoading = false;
      return;
    }
    this.isLoading = false;
    this.isSent = true;
  }

  back() {
    this.router.navigate(['/items/all']);
  }
}
