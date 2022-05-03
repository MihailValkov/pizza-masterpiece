import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { IRootState } from 'src/app/+store';
import { updateUserImageStart } from 'src/app/+store/actions';
import {
  selectErrorMessage,
  selectIsLoading,
  selectSuccess,
  selectUpdateUserAddressIsLoading,
  selectUpdateUserImageIsLoading,
  selectUpdateUserInfoIsLoading,
  selectUserImage,
} from 'src/app/+store/selectors';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  subscription: Subscription = new Subscription();
  userImage$ = this.store.pipe(select(selectUserImage));
  uploadImageIsLoading$ = this.store.pipe(
    select(selectUpdateUserImageIsLoading)
  );
  updateUserInfoIsLoading$ = this.store.pipe(
    select(selectUpdateUserInfoIsLoading)
  );
  updateUserAddressIsLoading$ = this.store.pipe(
    select(selectUpdateUserAddressIsLoading)
  );
  errorMessage$ = this.store.pipe(select(selectErrorMessage));
  success$ = this.store.pipe(select(selectSuccess));

  constructor(private store: Store<IRootState>) {}

  ngOnInit(): void {
  }

  onFileUpload(imageFileData: IFileImageUpload) {
    const formData = new FormData();
    formData.append('image', imageFileData.file);
    this.store.dispatch(updateUserImageStart({ formData }));
  }
}
