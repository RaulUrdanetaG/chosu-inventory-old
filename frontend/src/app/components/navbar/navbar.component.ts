import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public usersService: UsersService, private router: Router) {}

  onClickLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/items/all']);
  }
}
