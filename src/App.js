/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import './styles/App.css';
import Home from './components/presentational/Home';
import CitizenListContainer from './components/containers/CitizenListContainer';
import BusinessListContainer from './components/containers/BusinessListContainer';
import VATRefund from './components/presentational/VATRefund';
import Cart from './components/presentational/Cart';
import Footer from './components/presentational/Footer'
import Success from './components/presentational/Success';
import Error from './components/presentational/Error';
import Orders from './components/presentational/Orders';
import TransactionsManager from './components/presentational/TransactionsManager';
import Checkout from './components/presentational/Checkout';
import PurchasesConfirmation from './components/presentational/PurchasesConfirmation';
import EditProductsManager from './components/presentational/EditProductsManager';
import AddProductsManager from './components/presentational/AddProductsManager';
import history from './store/history';
import ProductsManagerContainer from './components/containers/ProductManagerContainer';

//store.dispatch(reset())

class App extends Component {

  render() {
    let props = this.props
    //console.log(props.loading)
    if(props.loading === false){
      return (
        <Router history={history}>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route path="/userslist" component={CitizenListContainer} />
            <Route path="/businesslist" component={BusinessListContainer} />
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
            <Route path="/productsmanager" component={ProductsManagerContainer} />
            <Route path="/editproductsmanager" component={EditProductsManager} />
            <Route path="/addproductsmanager" component={AddProductsManager} />
            <Route path="/checkout" component={Checkout} />
            <Footer />
          </div>
        </Router>
      );
    }else{
      return(
        <div>
          <img id="arrow" src="arrow.png" />
          <p id="loading">Loading</p>
          <Particles
            params={{
              particles: {
                number: {
                  value: 30,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                },
                color: {
                  value: '#000000'
                },
                shape: {
                  type: 'circle',
                  stroke: {
                    width: 0,
                    color: '#000000'
                  },
                  polygon: {
                    nb_sides: 5
                  },
                  image: {
                    width: 100,
                    height: 100
                  }
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 200,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 3,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 300,
                  color: '#000000',
                  opacity: 0.4,
                  width: 2
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: 'none',
                  random: false,
                  straight: false,
                  out_mode: 'out',
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              retina_detect: true
            }}
          />
        </div>
      )
    }
  }
}
export default App;
