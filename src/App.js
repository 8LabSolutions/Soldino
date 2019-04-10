import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './styles/App.css';
import Home from './components/presentational/Home';
import UsersList from './components/presentational/UsersList';
import VATRefund from './components/presentational/VATRefund';
import Cart from './components/presentational/Cart';
import Footer from './components/presentational/Footer'
import Success from './components/presentational/Success';
import Error from './components/presentational/Error';
import Orders from './components/presentational/Orders';
import TransactionsManager from './components/presentational/TransactionsManager';
import Checkout from './components/presentational/Checkout';
import PurchasesConfirmation from './components/presentational/PurchasesConfirmation';
import ProductsManager from './components/presentational/ProductsManager';
import EditProductsManager from './components/presentational/EditProductsManager';
import AddProductsManager from './components/presentational/AddProductsManager';

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
          <Route path="/errorregistration" render={()=><Error errorMessage="Registration failed." nextMessage="Something went wrong, try checking Metamask or changing email address." />} />
          <Route path="/successregistration" render={()=><Success successMessage="Registration completed." nextMessage="Now you can login and start using Soldino." />} />
          <Route path="/errorcheckout" render={()=><Error errorMessage="Empty cart." nextMessage="You should add something to your cart before performing this action." />} />
          <Route path="/erroruserdisabled" render={()=><Error errorMessage="User disabled." nextMessage="You have been disabled, you can't enjoy Soldino right now." />} />
          <Route path="/errorkey" render={()=><Error errorMessage="User already registered." nextMessage="You should log in." />} />
          <Route path="/errorpayment" render={()=><Error errorMessage="Payment failed." nextMessage="Something has gone wrong during the payment." />} />
          <Route path="/orders" component={Orders} />
          <Route path="/purchasesconfirmation" component={PurchasesConfirmation} />
          <Route path="/transactionsmanager" component={TransactionsManager} />
          <Route path="/productsmanager" component={ProductsManager} />
          <Route path="/editproductsmanager" component={EditProductsManager} />
          <Route path="/addproductsmanager" component={AddProductsManager} />
          <Route path="/checkout" component={Checkout} />
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
