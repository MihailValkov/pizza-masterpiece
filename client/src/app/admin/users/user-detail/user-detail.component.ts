import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAdminModuleState } from 'src/app/admin/+store';
import {
  selectAdminCurrentUser,
  selectAdminCurrentUserIsLoading,
} from 'src/app/admin/+store/users/selectors';
@Component({
  selector: 'app-user-table-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserTableDetailComponent {
  noAvatarImagePath = '../../../../../assets/images/anonymous-user-circle.png';
  currentUser$ = this.store.pipe(select(selectAdminCurrentUser));
  currentUserIsLoading$ = this.store.pipe(
    select(selectAdminCurrentUserIsLoading)
  );

  constructor(private store: Store<IAdminModuleState>) {}
}
