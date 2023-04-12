import { combineReducers } from 'redux';

import todos from './todos/reducer';
import todolists from './todolists/reducer';




const reducers = combineReducers({

 

  todos,
  todolists,

});

export default reducers;
