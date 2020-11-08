import { EmployeesActionTypes, IEmployeeInfo, LOAD_EMPLOYEES } from './types';

export const loadEmployees = (employees: IEmployeeInfo[]): EmployeesActionTypes => ({
  type: LOAD_EMPLOYEES,
  payload: employees,
});
