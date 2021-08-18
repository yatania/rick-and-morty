import React from 'react';
import './App.scss';
import { CharactersPage } from './components/CharactersPage/CharactersPage';
import './styles/general.scss';

const App = () => {

  return (
    <div className="App">
      <div className="App__wrapper">
        <CharactersPage />
      </div>
    </div>
  );
};

export default App;
