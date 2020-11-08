import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { block } from 'bem-cn';

import { RootState } from '../../store/rootReducer';
import type { IEmployeeInfo } from '../../store/employees/types';
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';

import './Home.sass';

interface IHomeProps {
  employees: IEmployeeInfo[];
}

const mapStateToProps = (state: RootState): IHomeProps => ({
  employees: state.employees.employees,
});

const connector = connect(mapStateToProps, null);

const b = block('home');

const Home: React.FC<IHomeProps> = ({ employees }) => {
  const employeesList = employees.length === 0
    ? <h1>Список сотрудников пуст</h1>
    : employees.map((info) => (
      <li className={b('employee')}>
        <EmployeeCard info={info} />
      </li>
    ));

  return (
    <div className={b()}>
      <main className={b('main')}>
        <div className={b('container-content')}>
          <Link className={b('add-employee-button')} to='/edit-card'>
            Добавить сотрудника
          </Link>
          <div className={b('filters')}>

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
