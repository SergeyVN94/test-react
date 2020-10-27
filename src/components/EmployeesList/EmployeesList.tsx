import React from 'react';
import { block } from 'bem-cn';

import EmployeeCard, { IEmployeeCardInfo } from './components/EmployeeCard/EmployeeCard';
import './EmployeesList.sass';

interface IEmployeesListProps {
  items: IEmployeeCardInfo[];
}

const b = block('employees-list');

const EmployeesList: React.FC<IEmployeesListProps> = ({ items }) => (
  <div className={b()}>
    <ul className={b('container')}>
      {
        items.map((item) => (
          <li className={b('card')} key={ item.id }>
            <EmployeeCard info={item} />
          </li>
        ))
      }
    </ul>
  </div>
);

export default EmployeesList;

export type { IEmployeesListProps };
