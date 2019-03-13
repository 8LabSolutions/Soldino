import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles/App.css';
import Home from './components/presentational/Home';
import Government from './components/presentational/Government';
import Store from './components/presentational/Store';
import Other from './components/presentational/Other';


export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/government" component={Government} />
          <Route path="/store" component={Store} />
          <Route path="/other" component={Other} />
        </div>
      </Router>
    );
  }
}
export default App;
