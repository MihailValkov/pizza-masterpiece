import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { updateUserImageStart } from 'src/app/+store/actions';
import * as selectors from 'src/app/+store/selectors';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  noAvatarImagePath = '../../../assets/images/anonymous-user-circle.png';

  userImage$ = this.store.pipe(select(selectors.selectUserImage));
  uploadImageIsLoading$ = this.store.pipe(
    select(selectors.selectUpdateUserImageIsLoading)
  );
  updateUserInfoIsLoading$ = this.store.pipe(
    select(selectors.selectUpdateUserInfoIsLoading)
  );
  updateUserAddressIsLoading$ = this.store.pipe(
    select(selectors.selectUpdateUserAddressIsLoading)
  );

  updateUserPasswordIsLoading$ = this.store.pipe(
    select(selectors.selectUpdateUserPasswordIsLoading)
  );

  constructor(private store: Store<IRootState>) {}

  onFileUpload(imageFileData: IFileImageUpload) {
    const formData = new FormData();
    formData.append('image', imageFileData.file);
    this.store.dispatch(updateUserImageStart({ formData }));
  }
}
