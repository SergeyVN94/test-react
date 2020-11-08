export const LOAD_EMPLOYEES = '@APP/LOAD_EMPLOYEES';

export interface IEmployeeInfo {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

export interface IEmployeesState {
  employees: IEmployeeInfo[];
}

interface ILoadEmployeesAction {
  type: typeof LOAD_EMPLOYEES;
  payload: IEmployeeInfo[];
}

export type EmployeesActionTypes = ILoadEmployeesAction;
