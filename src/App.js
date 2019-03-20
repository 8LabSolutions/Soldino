import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles/App.css';
import Home from './components/presentational/Home';
import UsersList from './components/presentational/UsersList';
import VATRefund from './components/presentational/VATRefund';
import Cart from './components/presentational/Cart';
import Footer from './components/presentational/Footer'
import SuccessRegistration from './components/presentational/SuccessRegistration';
import VATManager from './components/presentational/VATManager';
import TransactionsManager from './components/presentational/TransactionsManager';
import ProductsManager from './components/presentational/ProductsManager';
import Checkout from './components/presentational/Checkout';

export const history = createBrowserHistory();

//store.dispatch(reset())

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/userslist" component={UsersList} />
          <Route path="/vatrefund" component={VATRefund} />
          <Route path="/cart" component={Cart} />
          <Route path="/success" component={SuccessRegistration} />
          <Route path="/vatmanager" component={VATManager} />
          <Route path="/transactionsmanager" component={TransactionsManager} />
          <Route path="/productsmanager" component={ProductsManager} />
          <Route path="/checkout" component={Checkout} />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
