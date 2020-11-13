import { Reducer } from 'react';
import {
  IEmployeesState,
  EmployeesActionTypes,
  LOAD_EMPLOYEES,
  EDIT_EMPLOYEE,
} from './types';

const initialState: IEmployeesState = {
  employees: [],
};

const employeesReducer: Reducer<IEmployeesState, EmployeesActionTypes> = (
  state = initialState,
  action,
): IEmployeesState => {
  switch (action.type) {
    case LOAD_EMPLOYEES:
      return { ...state, employees: action.payload };

    case EDIT_EMPLOYEE: {
      const newState = { ...state };
      const { payload, index } = action;
      newState.employees[index] = payload;
      return newState;
    }

    default:
      return state;
  }
};

export default employeesReducer;
