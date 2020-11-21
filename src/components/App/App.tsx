import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import EmployeePage from '../../pages/EmployeePage/EmployeePage';
import store from '../../store/store';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter basename='/test-react'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route path='/employee/:id' component={ EmployeePage } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
