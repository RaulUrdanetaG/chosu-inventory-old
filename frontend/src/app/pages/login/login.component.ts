import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  isValid: boolean = true;
  isLoading: boolean = false;

  constructor(private usersService: UsersService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    this.isLoading = true;
    const res = await this.usersService.login(this.form.value);

    if (res.error) {
      this.isValid = false;
    }

    if (res.succes) {
      this.isValid = true;
      localStorage.setItem('user', res.user);
      localStorage.setItem('id', res.id);
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
      this.router.navigate(['/items/all']);
    }
    this.isLoading = false;
  }

  forgotPassword() {
    this.router.navigate(['/password/enterEmail']);
  }
}
