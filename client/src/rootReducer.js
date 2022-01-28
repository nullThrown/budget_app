import { combineReducers } from 'redux';
// import financeReducer from './features/finance/financeReducer';
import userReducer from './features/auth/userSlice';
import profileReducer from './features/profile/profileSlice';
import expensesReducer from './features/expenses/expensesSlice';
import recurringReducer from './features/recurring/recurringSlice';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  expenses: expensesReducer,
  recurring: recurringReducer,
});

export default rootReducer;
