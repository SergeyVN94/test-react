import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { loadEmployees } from '../../store/employees/actions';

import employees from '../../data/employees.json';

// import EditCard from '../../pages/EditCard/EditCard';
import Home from '../../pages/Home/Home';
import store from '../../store/store';

const App: React.FC = () => {
  store.dispatch(loadEmployees(employees));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path='/edit-card' component={ EditCard } /> */}
          <Route component={ Home } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
