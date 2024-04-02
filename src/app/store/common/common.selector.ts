import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.state';

export const COMMON_STATE_NAME = 'common';

const getCommonState = createFeatureSelector<CommonState>(COMMON_STATE_NAME);

export const getLoading = createSelector(getCommonState, (state) => {
  return state.showLoading;
});
