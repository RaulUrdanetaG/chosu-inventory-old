import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  isLoading: boolean = true;
  isValid: boolean = false;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('UID');
    const token = this.route.snapshot.paramMap.get('token');
    console.log('id', id);
    console.log('token', token);
    const response = await this.usersService.verifyEmail(token!, id!);
    console.log(response);

    if (!response.error) {
      this.isValid = true;
    }

    this.isLoading = false;
  }

  navigateToLogin() {
    this.router.navigate(['/users/login']);
  }
}
