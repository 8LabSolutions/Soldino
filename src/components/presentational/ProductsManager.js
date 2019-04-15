import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import BusinessProduct from './BusinessProduct';
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';
import business from '../../facade/business'

class ProductsManager extends Component {

  constructor(props){
    super(props)
    this.state = {
      productsArray: []
    }
  }

  printProduct(product) {
    return(
      <BusinessProduct key={product.title} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} />
    )
  }

  render() {
    //get data from ipfs
    let {productsArray} = this.state;
    business.getSenderProduct(5).then((ris)=>{
      if (ris === undefined){ris = []}
      this.setState({
        productsArray: ris
      })
    })

    return (
      <div>
        <NavBar />
        <h3>ProductsManager</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <NavLink className="nav-item nav-link" to="/addproductsmanager">
                <ButtonGeneric text="Add a product" args1={null} />
              </NavLink>
              <br />
            </div>
            {productsArray.map(i => this.printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default ProductsManager;
