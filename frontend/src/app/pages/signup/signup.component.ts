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
  isLoading: boolean = false;

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    this.isLoading = true;
    if (!this.form.valid) {
      this.isValid = false;
      this.isExists = false;
      this.isLoading = false;
      return;
    }
    const res = await this.usersService.register(this.form.value);
    console.log(res);

    if (res.error === 'user already exists') {
      this.isExists = true;
      this.isValid = true;
      this.isLoading = false;
      return;
    }

    if (res.username) {
      this.isValid = true;
      this.router.navigate(['/users/login']);
    }
    this.isLoading = false;
  }
}
