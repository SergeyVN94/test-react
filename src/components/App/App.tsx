import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import EditCard from '../../pages/EditCard/EditCard';
import Home from '../../pages/Home/Home';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/edit-card' component={ EditCard } />
        <Route component={ Home } />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
