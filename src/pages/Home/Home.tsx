import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { block } from 'bem-cn';
import { Button } from '@material-ui/core';

import { RootState } from '../../store/rootReducer';
import type { IEmployeeInfo } from '../../store/employees/types';
import { IFiltersState } from '../../store/filters/types';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import Filters from '../../components/Filters/Filters';

import './Home.sass';

interface IHomeProps {
  employees: IEmployeeInfo[];
  filters: IFiltersState;
}

const mapStateToProps = (state: RootState): IHomeProps => ({
  employees: state.employees,
  filters: state.filters,
});

const connector = connect(mapStateToProps, null);

const b = block('home');

const filterEmployees = (
  employees: IEmployeeInfo[],
  filters: IFiltersState,
): IEmployeeInfo[] => {
  const filteredEmployees = employees.filter((info) => {
    if (info.isArchive !== filters.inArchive) return false;
    if (info.role !== filters.role) return false;
    return true;
  });

  switch (filters.sortBy) {
    case 'name':
      return filteredEmployees.sort((e1, e2) => {
        if (e1.name === e2.name) return 0;
        return e1.name > e2.name ? 1 : -1;
      });

    case 'date-of-birth':
      return filteredEmployees.sort((e1, e2) => {
        if (e1.birthday.getTime() === e2.birthday.getTime()) return 0;
        return e1.birthday.getTime() > e2.birthday.getTime() ? 1 : -1;
      });

    default:
      return filteredEmployees;
  }
};

const Home: React.FC<ConnectedProps<typeof connector>> = ({ employees, filters }) => {
  const filteredEmployees = filterEmployees(employees, filters);

  const employeesList = filteredEmployees.length === 0
    ? <h1>Сотрудников не найдено</h1>
    : filteredEmployees.map((info) => (
      <li className={b('employee')} key={info.id}>
        <EmployeeCard info={info} />
      </li>
    ));

  return (
    <div className={b()}>
      <main className={b('main')}>
        <div className={b('container-content')}>
          <div className={b('add-employee-button')}>
            <Button color="primary" variant="contained" component={Link} to="/employee/new">Добавить сотрудника</Button>
          </div>
          <div className={b('filters')}>
            <Filters />
          </div>
          <ul className={b('employees')}>
            {employeesList}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default connector(Home);
