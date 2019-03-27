import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';


class Store extends Component {
  printProduct(product) {
    return(
      <Product key={product[0]} title={product[0]} price={product[1]} description={product[2]} VAT={product[3]} />
    )
  }
  render() {
    let props = this.props
    let totalProducts = 50
    let name
    let totalPrice
    let VAT
    let description
    var product
    var productArray = []
    for(var i=0; i<totalProducts; i++){
      name = "Product #"+ i
      totalPrice = 9.99; { /*(Math.random() * (100 - 0.20) + 0.0200).toFixed(2) */}
      VAT = 22 //in %
      description = "description"
      if(name.toUpperCase().includes(props.searchProduct.toUpperCase()) || props.searchProduct === ""){
        product = [name, totalPrice, description, VAT]
        productArray[i] = product;
      }
    }
    return (
      <div>
        <h3>Store</h3>
        <div className="container">
          <div className="row">
            <SearchContainer />
            {productArray.map(i => this.printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default Store;
