import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';


class Store extends Component {

  componentWillMount(){
    const {getStoreProducts} = this.props;
    getStoreProducts(50,0);
  }

  printProduct(product) {
    return(
      //CHECK JSON ARGS NAMES
      <Product key={String(product.keyProd)} keyProd={String(product.keyProd)} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} sellerName={product.sellerName} sellerVATNumber={product.sellerVATNumber} />
    )
  }

  render() {
    let {storeProducts} = this.props;
    let list;
    if(storeProducts!== undefined && storeProducts.length>0)
      list = storeProducts.map(i => this.printProduct(i))
    return (
      <div>
        <h3>Store</h3>
        <div className="container">
          <div className="row">
            <SearchContainer />
            {list}
          </div>
        </div>
      </div>
    )
  }
}
export default Store;
