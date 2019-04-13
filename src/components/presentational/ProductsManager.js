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

  componentWillMount(){
    business.getSenderProduct(5).then((ris)=>{
      if (ris === undefined)
        ris = []
      console.log('didmount')
      console.log(ris)
      this.setState({
        productsArray: ris
      })
    })

  }

  printProduct(product) {
    return(
      <BusinessProduct key={product.title} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} />
    )
  }

  render() {
    let {productsArray} = this.state;

    /*
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
    */


    console.log('renderizzo')
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
