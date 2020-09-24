import React from 'react';
import ReactDOM from 'react-dom';

import Filters from '../components/filters/Filters';
import EmployeesContainer from '../containers/EmployeesContainer';
import actionFiltersUpdate from '../store/action-creators/action-creators';
import store from '../store/store';

const filters = {
  sortedBy: [
    { text: 'имя', value: 'name', name: 'sort-by' },
    { text: 'дата рождения', value: 'date-of-birth', name: 'sort-by' },
  ],
  statuses: [{ text: 'в архиве', value: 'in-archive' }],
  dropdowns: [
    {
      title: 'Должность',
      name: 'post',
      items: [
        { text: 'Повар', value: 'cook' },
        { text: 'Официант', value: 'waiter' },
        { text: 'Водитель', value: 'driver' },
      ],
    },
  ],
};

const App = (): JSX.Element => {
  const handleFiltersUpdate = (filtersState: IFiltersState): void => {
    store.dispatch(actionFiltersUpdate(filtersState));
  };

  return (
    <div className='page__content'>
      <div className='page__filters'>
        <Filters { ...filters } onUpdate={ handleFiltersUpdate } />
      </div>
      <div className='page__employees'>
        <EmployeesContainer />
      </div>
    </div>
  );
};

export default App;
