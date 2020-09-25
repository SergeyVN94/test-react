import React from 'react';
import { Link } from 'react-router-dom';

import { actionFiltersUpdate } from '../../store/action-creators/action-creators';
import store from '../../store/store';
import config from '../../data/config';
import EmployeesContainer from '../../containers/EmployeesContainer';
import Filters from '../filters/Filters';
import './home.sass';

const Home = (): JSX.Element => {
  const handleFiltersUpdate = (filtersState: IFiltersState): void => {
    store.dispatch(actionFiltersUpdate(filtersState));
  };

  return (
    <div className='page__content'>
      <Link className='page__add-employee-button' to='/edit-card'>Добавить сотрудника</Link>
      <div className='page__filters'>
        <Filters { ...config.filters } onUpdate={ handleFiltersUpdate } />
      </div>
      <div className='page__employees'>
        <EmployeesContainer />
      </div>
    </div>
  );
};

export default Home;
