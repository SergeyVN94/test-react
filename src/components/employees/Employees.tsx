import React from 'react';

import EmployeeCard from '../employee-card/EmployeeCard';
import './employees.sass';

const Employees = ({ employees }: IEmployeesProps): JSX.Element => (
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
