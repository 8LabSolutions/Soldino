/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import BusinessProduct from './BusinessProduct';
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';
import { round, checkBusiness } from '../../auxiliaryFunctions';
import { defaultIndex, amountStore } from '../../constants/fixedValues';

class ProductsManager extends Component {

  componentWillMount(){
    const {getProductsList} = this.props;
    getProductsList(defaultIndex);
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
    let {totalMyProduct} = this.props;
    let {index} = this.props;
    if(Math.floor(+(totalMyProduct/amountStore)+1) > (+index+1)){
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
    return(
      <BusinessProduct key={product.keyProd} keyProd={product.keyProd} title={product.title} price={round(product.totalPrice)} description={product.description} VAT={product.vatPercentage} image={product.image} />
    )
  }

  render() {
    if(!checkBusiness()){window.location.href = "/"}
    let {myProductsArray} = this.props;
    let list;
    let {index} = this.props;
    let {totalMyProduct} = this.props;
    if(myProductsArray!== undefined && myProductsArray.length>0)
      list = myProductsArray.map(i => this.printProduct(i))
    return (
      <div>
        <NavBar />
        <h3>PRODUCTS MANAGER</h3>
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
          {this.getLeftArrows()}
          <span>page {+index+1} of {Math.floor(+(totalMyProduct/amountStore)+1)}</span>
          {this.getRightArrows()}
        </div>
      </div>
    )
  }
}
export default ProductsManager;
