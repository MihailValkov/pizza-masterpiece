import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { selectUserImage, selectUser } from 'src/app/+store/selectors';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.css'],
})
export class AsideMenuComponent {
  noAvatarImagePath = '../../../assets/images/anonymous-user-circle.png';
  userImage$ = this.store.pipe(select(selectUserImage));
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<IRootState>) {}
}
