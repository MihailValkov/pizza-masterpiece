import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  searchCriterions = [
    { prop: 'firstName', value: 'First Name' },
    { prop: 'lastName', value: 'Last Name' },
    { prop: 'email', value: 'Email' },
    { prop: 'role', value: 'Role' },
    { prop: 'accountStatus', value: 'Account Status' },
  ];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  onSearchHandler(queryParams: { searchValue: string; selectValue: string }) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
