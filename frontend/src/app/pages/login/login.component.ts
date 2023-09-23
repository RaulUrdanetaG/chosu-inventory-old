import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  isValid: boolean = true;

  constructor(private usersService: UsersService) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  async onSubmit() {
    const res = await this.usersService.login(this.form.value);
    console.log(res);

    if (res.error) {
      this.isValid = false;
    }

    if (res.succes) {
      this.isValid = true;
    }
  }
}
