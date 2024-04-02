import { createReducer, on } from '@ngrx/store';
import { setLoadingSpinner } from './common.action';
import { initialState } from './common.state';

export const commonReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      state,
      showLoading: action.status,
    };
  })
);


