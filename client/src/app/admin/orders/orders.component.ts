import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  searchCriterions = [
    { prop: '_id', value: 'User Id' },
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
