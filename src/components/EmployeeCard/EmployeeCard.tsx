import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import type { IEmployeeInfo } from '../../store/employees/types';

import './EmployeeCard.sass';

interface IEmployeeCardProps {
  info: IEmployeeInfo;
}

const b = block('employee-card');

const EmployeeCard: React.FC<IEmployeeCardProps> = ({ info }) => {
  const {
    id,
    name,
    phone,
    role,
  } = info;

  const rows = [
    ['Имя', name],
    ['Должность', role],
    ['Телефон', phone],
  ].map(([label, value]) => (
    <li className={b('item')} key={label}>
      <p className={b('inner')}>
        <span className={b('label')}>{label}</span>
        <span className={b('value')}>{value}</span>
      </p>
    </li>
  ));

  return (
    <Link className={b()} to={ `/edit-card?id=${id}` }>
      <ul className={b('container')}>{rows}</ul>
    </Link>
  );
};

export default EmployeeCard;
