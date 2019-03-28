import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';


class Store extends Component {
  printProduct(product) {
    return(
      <Product key={product[0]} title={product[0]} price={product[1]} description={product[2]} VAT={product[3]} sellerName={product[4]} sellerVATNumber={product[5]} />
    )
  }
  render() {
    let props = this.props
    let totalProducts = 50
    let name
    let totalPrice
    let VAT
    let sellerName
    let sellerVATNumber
    let description
    var product
    var productArray = []
    let fakeSellerNames = [ //remove it
      'Seller1 S.P.A',
      'Seller2 S.P.A',
      'Seller3 S.P.A'
    ];
    let randomfakeSeller; //remove it
    for(var i=0; i<totalProducts; i++){
      name = "Product #"+ i
      totalPrice = 9.99; { /*(Math.random() * (100 - 0.20) + 0.0200).toFixed(2) */}
      VAT = 22 //in %
      randomfakeSeller = Math.floor(Math.random()*fakeSellerNames.length); //remove it
      sellerName = fakeSellerNames[randomfakeSeller]
      sellerVATNumber = "01384571004"
      description = "description"
      if(name.toUpperCase().includes(props.searchProduct.toUpperCase()) || props.searchProduct === ""){
        product = [name, totalPrice, description, VAT, sellerName, sellerVATNumber]
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
