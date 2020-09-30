import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import EditCard from '../EditCard/EditCard';
import Home from '../Home/Home';

const App = (): JSX.Element => (
  <div className='app'>
    <BrowserRouter>
      <Switch>
        <Route exact path='/edit-card' component={ EditCard } />
        <Route exact component={ Home } />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
