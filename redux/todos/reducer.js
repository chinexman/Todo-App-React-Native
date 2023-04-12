import {
  getCurrentUser,
  // getUserDetail
} from '../../src/helpers/Utils';
import {
  //  isAuthGuardActive,
  currentUser,
} from '../../src/contants/defaultValues';
// import jwt_decode from "jwt-decode";

import {
  TODOS,
  TODOS_SUCCESS,
  TODOS_ERROR,
} from '../contants';


const INIT_STATE = {
  currentTodos: [],
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODOS:
      return { ...state, loading: true, error: '' };
    case TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTodos: action.payload,
        error: '',
      };
    case TODOS_ERROR:
      return {
        ...state,
        loading: false,
        currentTodos: null,
        error: action.payload.message,
      };

    default:
      return { ...state };
  }
};
