import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles/App.css';
import Home from './components/presentational/Home';
import Government from './components/presentational/Government';


export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/government" component={Government} />
        </div>
      </Router>
    );
  }
}
export default App;
