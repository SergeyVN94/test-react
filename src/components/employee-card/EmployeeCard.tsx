import React from 'react';
import { Link } from 'react-router-dom';

import './employee-card.sass';

const EmployeeCard = (props: IEmployeeCardProps): JSX.Element => (
  <Link className='employee-card' data-info={ JSON.stringify(props) } to={ `/edit-card?id=${props.id}` }>
    <ul className='employee-card__container'>
      <li className='employee-card__item'>
        <p className='employee-card__text'>
          <span className='employee-card__label'>Имя</span>
          <span className='employee-card__value'>{props.name ? props.name : 'нет'}</span>
        </p>
      </li>
      <li className='employee-card__item'>
        <p className='employee-card__text'>
          <span className='employee-card__label'>Должность</span>
          <span className='employee-card__value'>{props.role ? props.role : 'нет'}</span>
        </p>
      </li>
      <li className='employee-card__item'>
        <p className='employee-card__text'>
          <span className='employee-card__label'>Телефон</span>
          <span className='employee-card__value'>{props.phone ? props.phone : 'нет'}</span>
        </p>
      </li>
    </ul>
  </Link>
);

export default EmployeeCard;
