import { combineReducers } from 'redux';
// import { userReducer } from './features/user/userSlice';
import profileReducer from './features/profile/profileSlice';
import expendituresReducer from './features/expenditures/expendituresSlice';
import userReducer from './features/auth/user';
const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  expenditures: expendituresReducer,
});

export default rootReducer;
