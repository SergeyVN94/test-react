import React from 'react';
import { Link } from 'react-router-dom';

import { actionFiltersUpdate } from '../../store/action-creators/action-creators';
import store from '../../store/store';
import config from '../../data/config';
import EmployeesContainer from '../../containers/EmployeesContainer';
import Filters from '../Filters/Filters';
import './home.sass';

const Home = (): JSX.Element => {
  const handleFiltersUpdate = (filtersState: IFiltersState): void => {
    store.dispatch(actionFiltersUpdate(filtersState));
  };

  return (
    <div className='home'>
      <main className='home__main'>
        <div className='home__container-content'>
          <Link className='home__add-employee-button' to='/edit-card'>
            Добавить сотрудника
          </Link>
          <div className='home__filters'>
            <Filters {...config.filters} onUpdate={handleFiltersUpdate} />
          </div>
          <div className='home__employees'>
            <EmployeesContainer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
