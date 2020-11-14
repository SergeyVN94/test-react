import { Reducer } from 'react';
import {
  IEmployeesState,
  EmployeesActionTypes,
  LOAD_EMPLOYEES,
  EDIT_EMPLOYEE,
} from './types';

const employeesReducer: Reducer<IEmployeesState, EmployeesActionTypes> = (
  state = [],
  action,
): IEmployeesState => {
  switch (action.type) {
    case LOAD_EMPLOYEES:
      return action.payload;

    case EDIT_EMPLOYEE: {
      const newState = [...state];
      const { payload, index } = action;
      newState[index] = payload;
      return newState;
    }

    default:
      return state;
  }
};

export default employeesReducer;
