import { Reducer } from 'react';
import {
  IEmployeesState,
  EmployeesActionTypes,
  LOAD_EMPLOYEES,
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

    default:
      return state;
  }
};

export default employeesReducer;
