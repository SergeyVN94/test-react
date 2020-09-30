import React from 'react';
import { Link } from 'react-router-dom';

import store from '../../store/store';
import { actionEmployeesUpdate } from '../../store/action-creators/action-creators';
import FormEdit from '../FormEdit/FormEdit';
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

    if (isNewEmployee) console.info(`Added user with id ${finallyId}.`);
    else console.info(`Changed user with id ${finallyId}.`);

    store.dispatch(actionEmployeesUpdate(employees));
    window.location.href = '/';
  };

  return (
    <div className='edit-card'>
      <main className='edit-card__main'>
        <div className="edit-card__container-content">
          <Link to='/' className='edit-card__link-to-home'>На главную</Link>
          <div className='card-edit-employee'>
            <h3 className="card-edit-employee__form-title">{ employeeInfo ? 'Редактирование' : 'Создание нового' } пользователя</h3>
            <div className='card-edit-employee__form-edit'>
              <FormEdit employeeInfo={ employeeInfo } onSubmit={ onSubmit } />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditCard;
