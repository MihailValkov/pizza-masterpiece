import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { IAdminModuleState } from "src/app/admin/+store";
import { changeUserAccountSettingsStart } from "src/app/admin/+store/users/actions";
import {
  selectAdminCurrentUserIsLoading,
  selectAdminUsersAccountStatuses,
  selectAdminUsersRoles,
} from "src/app/admin/+store/users/selectors";
import { IAccountStatus, IRole } from "src/app/shared/interfaces/admin";

@Component({
  selector: "app-change-user-settings-form",
  templateUrl: "./change-user-settings-form.component.html",
  styleUrls: ["./change-user-settings-form.component.css"],
})
export class ChangeUserSettingsFormComponent {
  @Input() userId!: string;
  @Input() currentAccountStatus!: IAccountStatus;
  @Input() currentUserRole!: IRole;

  accountStatuses$ = this.store.pipe(select(selectAdminUsersAccountStatuses));
  usersRoles$ = this.store.pipe(select(selectAdminUsersRoles));
  currentUserIsLoading$ = this.store.pipe(select(selectAdminCurrentUserIsLoading));

  constructor(private store: Store<IAdminModuleState>) {}

  submitHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { role, accountStatus } = form.value;
    this.store.dispatch(
      changeUserAccountSettingsStart({
        userId: this.userId,
        role,
        accountStatus,
      })
    );
  }
}
