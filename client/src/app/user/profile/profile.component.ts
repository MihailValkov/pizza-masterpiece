import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { updateUserImageStart } from 'src/app/+store/actions';
import { selectIsLoading, selectUpdateUserImageIsLoading, selectUpdateUserInfoIsLoading, selectUserImage } from 'src/app/+store/selectors';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userImage$ = this.store.pipe(select(selectUserImage));
  uploadImageIsLoading$ = this.store.pipe(select(selectUpdateUserImageIsLoading));
  updateUserInfoIsLoading$ = this.store.pipe(select(selectUpdateUserInfoIsLoading));

  constructor(private store: Store<IRootState>) {}

  ngOnInit(): void {}

  onFileUpload(imageFileData: IFileImageUpload) {
    const formData = new FormData();
    formData.append('image', imageFileData.file);
    this.store.dispatch(updateUserImageStart({ formData }));
  }
}
