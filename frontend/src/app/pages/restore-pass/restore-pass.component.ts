import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-restore-pass',
  templateUrl: './restore-pass.component.html',
  styleUrls: ['./restore-pass.component.css'],
})
export class RestorePassComponent {
  form: FormGroup;
  isValid: boolean = true;
  isLoading: boolean = false;
  isError: boolean = false;
  isSent: boolean = false;
  isPassEqual: boolean = true;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      pass: new FormControl(),
      pass2: new FormControl(),
    });
  }

  async restorePass() {
    this.isSent = false;
    this.isLoading = true;
    if (!this.form.valid) {
      this.isValid = false;
      this.isError = false;
      this.isLoading = false;
      this.isPassEqual = true;
      return;
    }
    this.isValid = true;
    this.isError = false;

    const email = this.route.snapshot.paramMap.get('email');
    const pass = this.form.get('pass')?.value;
    const pass2 = this.form.get('pass2')?.value;

    console.log(email);

    if (pass !== pass2) {
      this.isPassEqual = false;
      this.isValid = true;
      this.isError = false;
      this.isLoading = false;
      return;
    }

    const response = await this.usersService.restorePass(email!, pass);

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
