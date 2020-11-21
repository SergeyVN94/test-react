import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import EmployeePage from '../../pages/EmployeePage/EmployeePage';
import store from '../../store/store';
import { IEmployeeInfo } from '../../store/employees/types';
import { loadEmployees } from '../../store/employees/actions';
import { Role } from '../../store/filters/types';

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

const App: React.FC = () => {
  store.dispatch(loadEmployees(baseEmployeesList));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/employee/:id' component={ EmployeePage } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
