/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import { ToastProvider } from 'react-toast-notifications';
import './styles/App.css';
import Home from './components/presentational/Home';
import CitizenListContainer from './components/containers/CitizenListContainer';
import BusinessListContainer from './components/containers/BusinessListContainer';
import Cart from './components/presentational/Cart';
import Footer from './components/presentational/Footer'
import TransactionsManagerContainer from './components/containers/TransactionManagerContainer';
import Checkout from './components/presentational/Checkout';
import PurchasesConfirmation from './components/presentational/PurchasesConfirmation';
import EditProductsManager from './components/presentational/EditProductsManager';
import AddProductsManager from './components/presentational/AddProductsManager';
import history from './store/history';
import ProductsManagerContainer from './components/containers/ProductManagerContainer';
import OrdersContainer from './components/containers/OrdersContainer';
import VATRefundContainer from './components/containers/VATRefundContainer';
import { PARTICLES } from './constants/fixedValues';

//store.dispatch(reset())

class App extends Component {
  render() {
    let props = this.props
    if(props.loading === false){
      return (
        <ToastProvider>
          <Router history={history}>
            <div className="App">
              <Route exact path="/" component={Home} />
              <Route path="/userslist" component={CitizenListContainer} />
              <Route path="/businesslist" component={BusinessListContainer} />
              <Route path="/vatrefund" component={VATRefundContainer} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={OrdersContainer} />
              <Route path="/purchasesconfirmation" component={PurchasesConfirmation} />
              <Route path="/transactionsmanager" component={TransactionsManagerContainer} />
              <Route path="/productsmanager" component={ProductsManagerContainer} />
              <Route path="/editproductsmanager" component={EditProductsManager} />
              <Route path="/addproductsmanager" component={AddProductsManager} />
              <Route path="/checkout" component={Checkout} />
              <Footer />
            </div>
          </Router>
        </ToastProvider>

      );
    }else{
      return(
        <ToastProvider>
          <div>
            <p id="loading">Loading</p>
            <span id="loading" className="loading-small">{props.loadingMessage}</span>
            <Particles params={PARTICLES} />
          </div>
        </ToastProvider>
      )
    }
  }
}
export default App;
