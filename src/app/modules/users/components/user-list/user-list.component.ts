import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);
  users: any = [];

  async ngOnInit() {
    try {
      const response = await this.usersService.getAll();
      this.users = response.results;

      // TODO: arreglar cuando haga el registro login
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }
}
