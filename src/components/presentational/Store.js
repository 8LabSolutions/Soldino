/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';


class Store extends Component {

  componentWillMount(){
    const {getStoreProducts} = this.props;
    let {index} = this.props;
    getStoreProducts(index);
  }

  printProduct(product) {
    let {searchProduct} = this.props;
    if(product.title.toLowerCase().includes(searchProduct.toLowerCase())){
      return(
        //CHECK JSON ARGS NAMES
        <Product key={String(product.keyProd)} keyProd={String(product.keyProd)} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} sellerName={product.sellerName} sellerVATNumber={product.sellerVATNumber} image={product.image} />
      )
    }
  }

  render() {
    let {storeProducts} = this.props;
    let {index} = this.props;
    let {increaseIndex} = this.props;
    let {decreaseIndex} = this.props;
    let next = ">>"
    let prev = "<<"
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
          <a className="decrease" onClick={()=>{decreaseIndex()}}>{prev}</a>
          <span>page {+index+1}</span>
          <a className="increase" onClick={()=>{increaseIndex()}}>{next}</a>
        </div>
      </div>
    )
  }
}
export default Store;
