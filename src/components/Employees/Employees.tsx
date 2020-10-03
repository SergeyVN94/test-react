import React from 'react';

import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './employees.sass';

const Employees: React.FC<IEmployeesProps> = ({ employees }) => (
  <div className='employees'>
    <ul className='employees__container'>
      {
        employees.map((employee) => (
          <li className='employees__card' key={ employee.id }>
            <EmployeeCard { ...employee } />
          </li>
        ))
      }
    </ul>
  </div>
);

export default Employees;
