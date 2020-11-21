import { Reducer } from 'react';
import {
  IEmployeesState,
  EmployeesActionTypes,
  LOAD_EMPLOYEES,
  EDIT_EMPLOYEE,
  ADD_EMPLOYEE,
  IEmployeeInfo,
} from './types';
import { Role } from '../filters/types';
import employeesJSON from '../../data/employees.json';

const baseEmployeesList: IEmployeeInfo[] = [];
const roles: Role[] = ['cook', 'driver', 'waiter'];

employeesJSON.forEach((info): boolean => {
  if (!(/^\d+$/.test(info.id.toString()))) {
    console.error(new TypeError(`Invalid id field. Employee information: ${JSON.stringify(info)}`));
    return false;
  }

  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(info.birthday)) {
    console.error(new TypeError(`Incorrect birthday field for employee with id ${info.id}`));
    return false;
  }

  const [day, month, year] = info.birthday.split('.').map((i) => parseInt(i, 10));
  const dateOfBirth = new Date(year, month - 1, day);

  const isInvalidDateOfBirth = day !== dateOfBirth.getDate()
  || month !== dateOfBirth.getMonth() + 1
  || year !== dateOfBirth.getFullYear();

  if (isInvalidDateOfBirth) {
    console.error(new TypeError(`Incorrect birthday field for employee with id ${info.id}`));
    return false;
  }

  if (!roles.includes(info.role as Role)) {
    console.error(new TypeError(`Incorrect role field for employee with id ${info.id}`));
    return false;
  }

  baseEmployeesList.push({
    ...info,
    birthday: dateOfBirth,
    role: info.role as Role,
  });

  return true;
});

const employeesReducer: Reducer<IEmployeesState, EmployeesActionTypes> = (
  state = baseEmployeesList,
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

    case ADD_EMPLOYEE: {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

export default employeesReducer;
