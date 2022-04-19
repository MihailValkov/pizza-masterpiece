import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { IUserDataState } from '.';

export const hydrationMetaReducer = (
  reducer: ActionReducer<IUserDataState>
): ActionReducer<IUserDataState> => {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('userData');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('userData');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('userData', JSON.stringify(nextState));
    return nextState;
  };
};
