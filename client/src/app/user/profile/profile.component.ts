import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { selectUserImage } from 'src/app/+store/selectors';
import { IFileImageUpload } from 'src/app/shared/interfaces/image-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userImage = this.store.pipe(select(selectUserImage));

  constructor(private store: Store<IRootState>) {}

  ngOnInit(): void {}

  onFileUpload(imageFileData: IFileImageUpload) {
    console.log(imageFileData);
  }
}
