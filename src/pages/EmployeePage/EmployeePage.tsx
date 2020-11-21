import React from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { block } from 'bem-cn';
import { Button } from '@material-ui/core';

import { IEmployeeInfo } from '../../store/employees/types';
import { editEmployee, addEmployee } from '../../store/employees/actions';
import { RootState } from '../../store/rootReducer';
import FormEdit from '../../components/FormEmployee/FormEmployee';

import './EmployeePage.sass';

type UrlParams = { id: string };

interface IEmployeePageProps {
  employees: IEmployeeInfo[];
}

const mapStateToProps = (state: RootState): IEmployeePageProps => ({
  employees: state.employees,
});

const mapDispatch = {
  editEmployee,
  addEmployee,
};

const connector = connect(mapStateToProps, mapDispatch);

type EmployeesPageProps = ConnectedProps<typeof connector> & RouteComponentProps<UrlParams>;

const b = block('employee-page');

const EmployeePage: React.FC<EmployeesPageProps> = (props) => {
  const {
    employees,
    editEmployee: editEmployeeAction,
    addEmployee: addEmployeeAction,
    match,
  } = props;

  const id = parseInt(match.params.id, 10);
  const employeeIndex = employees.findIndex((info) => info.id === id);
  const employeeInfo = employees[employeeIndex];
  const isNewEmployee = match.params.id === 'new';
  const isValidId = !Number.isNaN(id);
  const isEmployeeFound = employeeInfo !== undefined;

  const history = useHistory();

  let pageTitle = `${(match.params.id === 'new' ? 'Добавление нового ' : 'Редактирование')} сотрудника`;

  if (!isNewEmployee) {
    if (!isValidId) pageTitle = 'Некорректный id сотрудника!';
    else if (!isEmployeeFound) pageTitle = `Сотрудник с id '${match.params.id}' не найден!`;
  }

  const handleSubmit = (info: IEmployeeInfo): void => {
    if (!isNewEmployee) {
      editEmployeeAction(info, employeeIndex);
    } else {
      addEmployeeAction({ ...info, id: Date.now() });
    }

    history.push('/');
  };

  const form = !isNewEmployee && (!isValidId || !isEmployeeFound)
    ? null
    : (
      <div className={b('form')}>
        <FormEdit onSubmit={handleSubmit} info={employeeInfo} />
      </div>
    );

  return (
    <main className={b()}>
      <div className={b('container-content')}>
        <h1 className={b('title')}>{pageTitle}</h1>
        <div className={b('button-to-home')}>
          <Button color="primary" variant="contained" component={Link} to="/">На главную</Button>
        </div>
        {form}
      </div>
    </main>
  );
};

export default connector(EmployeePage);
