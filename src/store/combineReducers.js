import { combineReducers } from 'redux';

import userProfile from './reducers/userProfile';

const rootReducer = combineReducers({
  userProfile
});

export default rootReducer;
