import { combineReducers } from 'redux';
// import { userReducer } from './features/user/userSlice';
import profileReducer from './features/profile/profileSlice';
import expendituresReducer from './features/expenditures/expendituresSlice';
import financeReducer from './features/finance/financeReducer';
import userReducer from './features/auth/userSlice';
const rootReducer = combineReducers({
  user: userReducer,
  finance: financeReducer,
  profile: profileReducer,
  expenditures: expendituresReducer,
});

export default rootReducer;
