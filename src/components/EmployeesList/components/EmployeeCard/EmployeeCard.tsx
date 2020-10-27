import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';

import './EmployeeCard.sass';

interface IEmployeeCardInfo {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

interface IEmployeeCardProps {
  info: IEmployeeCardInfo;
}

const b = block('employee-card');

const EmployeeCard: React.FC<IEmployeeCardProps> = ({ info }) => {
  const rows = [
    { label: 'Имя', value: info.name },
    { label: 'Должность', value: info.role },
    { label: 'Телефон', value: info.phone },
  ].map(({ label, value }) => (
    <li className={b('item')} key={label}>
      <p className={b('inner')}>
        <span className={b('label')}>{label}</span>
        <span className={b('value')}>{value}</span>
      </p>
    </li>
  ));

  return (
    <Link className={b()} to={ `/edit-card?id=${info.id}` }>
      <ul className={b('container')}>{rows}</ul>
    </Link>
  );
};

export default EmployeeCard;

export type { IEmployeeCardInfo };
