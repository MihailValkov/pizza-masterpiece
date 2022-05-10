import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAdminModuleState } from 'src/app/admin/+store';
import { changeUserInfoStart } from 'src/app/admin/+store/users/actions';
import {
  selectAdminCurrentUser,
  selectAdminCurrentUserIsLoading,
  selectAdminUsersRoles,
} from 'src/app/admin/+store/users/selectors';
import { IRoles } from 'src/app/shared/interfaces/admin';

@Component({
  selector: 'app-user-table-detail',
  templateUrl: './user-table-detail.component.html',
  styleUrls: ['./user-table-detail.component.css'],
})
export class UserTableDetailComponent implements OnInit {
  @Input() roles!: IRoles[];
  noAvatarImagePath = '../../../../../assets/images/anonymous-user-circle.png';
  currentUser$ = this.store.pipe(select(selectAdminCurrentUser));
  currentUserIsLoading$ = this.store.pipe(
    select(selectAdminCurrentUserIsLoading)
  );
  usersRoles$ = this.store.pipe(select(selectAdminUsersRoles));

  constructor(private store: Store<IAdminModuleState>) {}

  submitHandler(form: NgForm, userId: string) {
    if (form.invalid || !userId) {
      return;
    }
    const { role, accountStatus } = form.value;
    this.store.dispatch(changeUserInfoStart({ userId, role, accountStatus }));
  }

  ngOnInit(): void {}
}
