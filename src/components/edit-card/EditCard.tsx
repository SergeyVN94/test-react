import React from 'react';
import { Link } from 'react-router-dom';

import store from '../../store/store';
import { actionEmployeesUpdate } from '../../store/action-creators/action-creators';
import FormEdit from '../form-edit/FormEdit';
import './edit-card.sass';

const EditCard = (): JSX.Element => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const isNewEmployee = Number.isNaN(id);
  const employeeInfo = store.getState().employees.find((employee) => employee.id === id);

  const onSubmit = (employee: IEmployeeInfo): void => {
    const { employees } = store.getState();

    const finallyId = isNewEmployee ? (employees[employees.length - 1].id + 1) : id;
    const index = isNewEmployee
      ? employees.length
      : employees.findIndex((item) => item.id === finallyId);

    employees[index] = employee;
    employees[index].id = finallyId;

    store.dispatch(actionEmployeesUpdate(employees));
    window.location.href = '/';
  };

  return (
    <div className='page__content'>
      <Link to='/' className='page__link-to-home'>На главную</Link>
      <div className='card-edit-employee'>
        <h3 className="card-edit-employee__form-title">{ employeeInfo ? 'Редактирование' : 'Создание нового' } пользователя</h3>
        <div className='card-edit-employee__form-edit'>
          <FormEdit employeeInfo={ employeeInfo } onSubmit={ onSubmit } />
        </div>
      </div>
    </div>
  );
};

export default EditCard;
