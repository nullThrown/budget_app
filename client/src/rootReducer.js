import { combineReducers } from 'redux';
import financeReducer from './features/finance/financeReducer';
import userReducer from './features/auth/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  finance: financeReducer,
});

export default rootReducer;
