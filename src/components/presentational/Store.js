/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';
import { amountStore } from '../../constants/fixedValues';


class Store extends Component {

  componentWillMount(){
    const {getStoreProducts} = this.props;
    let {index} = this.props;
    getStoreProducts(index);
  }

  getLeftArrows() {
    let {decreaseIndex} = this.props;
    let prev = "<<";
    let {index} = this.props;
    if(index > 0){
      return(
        <a className="decrease" onClick={()=>{decreaseIndex()}}>{prev}</a>
      )
    }else{
      return(
        <a className="decrease">{prev}</a>
      )
    }
  }

  getRightArrows() {
    let {increaseIndex} = this.props;
    let next = ">>";
    let {totalStoreProduct} = this.props;
    let {index} = this.props;
    if(Math.floor(+(totalStoreProduct/amountStore)+1) > (+index+1)){
      return(
        <a className="increase" onClick={()=>{increaseIndex()}}>{next}</a>
      )
    }else{
      return(
        <a className="increase">{next}</a>
      )
    }
  }

  printProduct(product) {
    let {searchProduct} = this.props;
    if(product.title.toLowerCase().includes(searchProduct.toLowerCase())){
      return(
        //CHECK JSON ARGS NAMES
        <Product key={String(product.keyProd)} keyProd={String(product.keyProd)} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} sellerName={product.sellerName} sellerVATNumber={product.sellerVATNumber} image={product.image} seller={product.seller} />
      )
    }
  }

  render() {
    let {storeProducts} = this.props;
    let {index} = this.props;
    let {totalStoreProduct} = this.props;
    let list;
    if(storeProducts!== undefined && storeProducts.length>0)
      list = storeProducts.map(i => this.printProduct(i))
    return (
      <div>
        <h3>STORE</h3>
        <div className="container">
          <div className="row">
            <SearchContainer />
            {list}
          </div>
          {this.getLeftArrows()}
          <span>page {+index+1} of {Math.floor(+(totalStoreProduct/amountStore)+1)}</span>
          {this.getRightArrows()}
        </div>
      </div>
    )
  }
}
export default Store;
