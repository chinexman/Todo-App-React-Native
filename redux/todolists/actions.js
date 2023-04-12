import {
  TODOLISTS,
  TODOLISTS_SUCCESS,
  TODOLISTS_ERROR,
} from '../contants';

export const todolists = (details) => ({
  type: TODOLISTS,
  payload: { details },
});
export const todolistsSuccess = (details) => ({
  type: TODOLISTS_SUCCESS,
  payload: details,
});
export const todolistsError = (detials) => ({
  type: TODOLISTS_ERROR,
  payload: { detials },
});


