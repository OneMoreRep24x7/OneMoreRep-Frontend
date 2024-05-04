import { createAction, props } from '@ngrx/store';

export const SET_LOADING_SPINNER = '[common] set loading spinner';

export const setLoadingSpinner = createAction(
  SET_LOADING_SPINNER,
  props<{ status: boolean }>()
);
