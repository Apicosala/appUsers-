import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralUserService } from 'src/app/core/services/general-user.service';
import { UsersService } from 'src/app/modules/users/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isMenuOpen: boolean = false;
  users: any = [];
  generalUser = inject(GeneralUserService);
  usersServide = inject(UsersService);
  router = inject(Router);

  ngOnInit(): void {
    this.generalUser.getUsers().then((response) => {
      this.users = response.results;
    });
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
