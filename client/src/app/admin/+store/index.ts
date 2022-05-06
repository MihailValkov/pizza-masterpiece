import { combineReducers } from '@ngrx/store';
import { IRootState } from 'src/app/+store';
import { productsReducers } from './products';
import { AdminProductsEffects } from './products/effects';
import { IProductsState } from './products/reducers';
import { usersReducers } from './users';
import { AdminUsersEffects } from './users/effects';
import { IUsersState } from './users/reducers';

export interface IAdminModuleState extends IRootState {
  readonly admin: {
    products: IProductsState;
    users: IUsersState;
  };
}

export const reducers = combineReducers({
  products: productsReducers.products,
  users: usersReducers.users,
});

export const AdminEffects = [AdminProductsEffects, AdminUsersEffects]