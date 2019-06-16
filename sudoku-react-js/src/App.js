import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sudoku from './components/Sudoku';
import Guide from './components/Guide';
import Statistics from './components/Statistics';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Result from './components/Result';
import ResultTip from './components/ResultTip';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Sudoku} />
          <Route exact path="/sudoku" component={Sudoku} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/resultTip" component={ResultTip} />

          <Route exact path="/guide" component={Guide} />
          <Route exact path="/statistics" component={Statistics} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
