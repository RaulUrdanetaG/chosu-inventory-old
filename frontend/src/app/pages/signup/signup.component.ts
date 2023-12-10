import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form: FormGroup;
  isValid: boolean = true;
  isExists: boolean = false;
  isExistsEmail: boolean = false;
  isLoading: boolean = false;
  isPassword: boolean = true;

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      password2: new FormControl(),
      phone: new FormControl(),
      verified: new FormControl(),
    });
  }

  async onSubmit() {
    this.isLoading = true;
    if (!this.form.valid) {
      this.isValid = false;
      this.isExists = false;
      this.isExistsEmail = false;
      this.isPassword = true;
      this.isLoading = false;
      return;
    }

    this.isValid = true;

    if (
      this.form.get('password')!.value !== this.form.get('password2')?.value
    ) {
      this.isExists = false;
      this.isExistsEmail = false;
      this.isPassword = false;
      this.isLoading = false;
      return;
    }
    this.form.get('verified')?.setValue(false);
    const res = await this.usersService.register(this.form.value);

    if (res.error === 'user already exists') {
      this.isExists = true;
      this.isExistsEmail = false;
      this.isValid = true;
      this.isPassword = false;
      this.isLoading = false;
      this.isPassword = true;
      return;
    }

    if (res.error === 'email already exists') {
      this.isExists = false;
      this.isExistsEmail = true;
      this.isValid = true;
      this.isPassword = false;
      this.isLoading = false;
      this.isPassword = true;
      return;
    }

    if (res.username) {
      this.isValid = true;
      this.router.navigate(['/users/login']);
    }
    this.isLoading = false;
  }
}
