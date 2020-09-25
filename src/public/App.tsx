import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import EditCard from '../components/edit-card/EditCard';
import Home from '../components/home/Home';

const App = (): JSX.Element => (
  <BrowserRouter>
    <div className='page__app'>
      <Switch>
        <Route exact path='/' component={ Home } />
        <Route exact path='/edit-card' component={ EditCard } />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
