import * as Redux from 'redux';

import employees from '../data/employees.json';
import filterEmployees from './filterEmployees';

const initialState: IStoreState = {
  employees: [...employees],
  filteredEmployee: [...employees],
  filterState: {},
};

const reducer = (state: IStoreState, action: IStoreAction): IStoreState => {
  switch (action.type) {
    case 'change-filters':
      return { ...state, filteredEmployee: filterEmployees(action.filtersState, state.employees) };

    default:
      return state;
  }
};

const store = Redux.createStore(reducer, initialState);

export default store;
