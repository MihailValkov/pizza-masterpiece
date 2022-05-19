import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  searchCriterion = [
    { prop: 'email', value: 'Email' },
    { prop: 'firstName', value: 'First Name' },
    { prop: 'lastName', value: 'Last Name' },
    { prop: 'role', value: 'Role' },
    { prop: 'accountStatus', value: 'Account Status' },
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onSearchHandler(queryParams: { searchValue: string; selectValue: string }) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
