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
      <p className={b('label')}>{label}</p>
      <p className={b('value')}>{value}</p>
    </li>
  ));

  return (
    <Link className={b()} to={ `/employee/${id}` }>
      <ul className={b('container')}>{rows}</ul>
    </Link>
  );
};

export default EmployeeCard;
