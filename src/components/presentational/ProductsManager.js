import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import BusinessProduct from './BusinessProduct';
import NavBar from './NavBar';
import ButtonBusinessProduct from '../containers/ButtonBusinessProduct';


class ProductsManager extends Component {
  printProduct(product) {
    return(
      <BusinessProduct key={product[0]} title={product[0]} price={product[1]} description={product[2]} VAT={product[3]} />
    )
  }
  render() {
    let totalProducts = 10
    let name
    let totalPrice
    let VAT
    let description
    var product
    var productArray = []
    for(var i=0; i<totalProducts; i++){
      name = "Product #"+ i
      totalPrice = 9.99;
      VAT = 22 //in %
      description = "description"
      product = [name, totalPrice, description, VAT]
      productArray[i] = product;
    }
    return (
      <div>
        <NavBar />
        <h3>ProductsManager</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <NavLink className="nav-item nav-link" to="/addproductsmanager">
                <ButtonBusinessProduct text="Add a product" args1={null} />
              </NavLink>
              <br />
            </div> 
            {productArray.map(i => this.printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default ProductsManager;
