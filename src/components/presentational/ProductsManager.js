import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import BusinessProduct from './BusinessProduct';
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';

class ProductsManager extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    const {getProductsList} = this.props;
    getProductsList(50,0);
  }

  printProduct(product) {
    return(
      <BusinessProduct key={product.keyProd} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} />
    )
  }

  render() {
    let {myProductsArray} = this.props;
    let list;
    if(myProductsArray!== undefined && myProductsArray.length>0)
      list = myProductsArray.map(i => this.printProduct(i))
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
            {list}
          </div>
        </div>
      </div>
    )
  }
}
export default ProductsManager;
