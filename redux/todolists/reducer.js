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
  TODOLISTS,
  TODOLISTS_SUCCESS,
  TODOLISTS_ERROR,
} from '../contants';


const INIT_STATE = {
  currentTodolists: [],
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODOLISTS:
      return { ...state, loading: true, error: '' };
    case TODOLISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTodolists: action.payload,
        error: '',
      };
    case TODOLISTS_ERROR:
      return {
        ...state,
        loading: false,
        currentTodolists: null,
        error: action.payload.message,
      };

    default:
      return { ...state };
  }
};
