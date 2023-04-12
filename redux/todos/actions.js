import {
  TODOS,
  TODOS_SUCCESS,
  TODOS_ERROR,
} from '../contants';

export const todos = (details) => ({
  type: TODOS,
  payload: { details },
});
export const todosSuccess = (details) => ({
  type: TODOS_SUCCESS,
  payload: details,
});
export const todosError = (detials) => ({
  type: TODOS_ERROR,
  payload: { detials },
});


