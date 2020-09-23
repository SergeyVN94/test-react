import React from 'react';
import ReactDOM from 'react-dom';

import Filters from '../../components/filters/filters';
import Employees from '../../components/employees/Employees';
import employees from '../../data/employees.json';
import filterEmployees from './filterEmployees';
import './list.sass';

const filters = new Filters('#filters');

filters.onChange((filtersState: IFiltersState) => {
  console.log(filtersState);
  
  const filteredEmployee = filterEmployees(filtersState, employees);
  ReactDOM.render(<Employees employees={ filteredEmployee }/>, document.getElementById('employees'));
});

ReactDOM.render(
  <Employees employees={ filterEmployees(filters.getState(), employees) }/>,
  document.getElementById('employees'),
);
