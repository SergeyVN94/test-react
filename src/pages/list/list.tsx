import React from 'react';
import ReactDOM from 'react-dom';

import Filters, { IStateComponents } from '../../components/filters/filters';
import Employees from '../../components/employees/Employees';
import './list.sass';
import employees from '../../data/employees.json';

interface IEmployeeInfo {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

const filters = new Filters('#filters');

const filterEmployees = ({ checkbox }: IStateComponents): IEmployeeInfo[] => {
  let filteredEmployee = [...employees];

  Object.keys(checkbox).forEach((key) => {
    if (key === 'in-archive') {
      filteredEmployee = filteredEmployee.filter((employee) => (
        checkbox[key].checked
          ? employee.isArchive
          : !employee.isArchive
      ));
    }
  });

  return filteredEmployee;
};

filters.onChange((filtersState: IStateComponents) => {
  const filteredEmployee = filterEmployees(filtersState);
  ReactDOM.render(<Employees employees={ filteredEmployee }/>, document.getElementById('employees'));
});

ReactDOM.render(
  <Employees employees={ filterEmployees(filters.getState()) }/>,
  document.getElementById('employees'),
);
