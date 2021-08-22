import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navigation } from './components/Navigation/Navigation';
import { Characters } from './pages/Characters';
import { Episodes } from './pages/Episodes';
import { Locations } from './pages/Locations';
import { MyWatchList } from './pages/MyWatchList';

import './styles/_reset.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="App__wrapper">
        <Switch>
          <Route exact path="/" component={Characters} />
          <Route exact path="/episodes" component={Episodes} />
          <Route exact path="/locations" component={Locations} />
          <Route exact path="/my-list" component={MyWatchList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
