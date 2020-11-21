import { Role } from '../filters/types';

export const LOAD_EMPLOYEES = '@APP/LOAD_EMPLOYEES';
export const EDIT_EMPLOYEE = '@APP/EDIT_EMPLOYEE';
export const ADD_EMPLOYEE = '@APP/ADD_EMPLOYEE';

export interface IEmployeeInfo {
  id: number;
  name: string;
  isArchive: boolean;
  role: Role;
  phone: string;
  birthday: Date;
}

export type IEmployeesState = IEmployeeInfo[];

interface ILoadEmployeesAction {
  type: typeof LOAD_EMPLOYEES;
  payload: IEmployeeInfo[];
}

interface IEditEmployeeAction {
  type: typeof EDIT_EMPLOYEE;
  payload: IEmployeeInfo;
  index: number;
}

interface IAddEmployeeAction {
  type: typeof ADD_EMPLOYEE;
  payload: IEmployeeInfo;
}

export type EmployeesActionTypes = ILoadEmployeesAction | IEditEmployeeAction | IAddEmployeeAction;
