import {
  EDIT_EMPLOYEE,
  EmployeesActionTypes,
  IEmployeeInfo,
  LOAD_EMPLOYEES,
} from './types';

export const loadEmployees = (employees: IEmployeeInfo[]): EmployeesActionTypes => ({
  type: LOAD_EMPLOYEES,
  payload: employees,
});

export const editEmployee = (employee: IEmployeeInfo, index: number): EmployeesActionTypes => ({
  type: EDIT_EMPLOYEE,
  payload: employee,
  index,
});
