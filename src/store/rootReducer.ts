import { combineReducers } from 'redux';

import employeesReducer from './employees/reducer';
import filtersReducer from './filters/reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
  filters: filtersReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
