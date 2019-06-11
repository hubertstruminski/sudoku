import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sudoku from './components/Sudoku';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Sudoku} />
          <Route exact path="/sudoku" component={Sudoku} />

        </div>
      </Router>
    </Provider>
  );
}

export default App;
