import React from 'react';
import ReactDOM from 'react-dom';

import Filters from '../../components/filters/filters';
import Employees from '../../components/employees/Employees';
import store from '../../store/store';
import actionFiltersUpdate from '../../actions/actions';
import './list.sass';

const filters = new Filters('#filters');

store.subscribe(() => {
  ReactDOM.render(
    <Employees employees={ store.getState().filteredEmployee }/>,
    document.getElementById('employees'),
  );
});

filters.onChange((filtersState: IFiltersState) => {
  store.dispatch(actionFiltersUpdate(filtersState));
});
