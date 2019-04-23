import React, {Component} from 'react';
import Product from './Product';
import SearchContainer from '../containers/SearchContainer';
import business from '../../facade/business';


class Store extends Component {

  limit = 50

  constructor(props){
    super(props)
    this.state = {
      productsArray: [],
      updated: false
    }
  }

  printProduct(product) {
    return(
      //CHECK JSON ARGS NAMES
      <Product key={String(product.keyProd)} keyProd={String(product.keyProd)} title={product.title} price={product.totalPrice} description={product.description} VAT={product.vatPercentage} sellerName={product.sellerName} sellerVATNumber={product.sellerVATNumber} />
    )
  }

  render() {
    let props = this.props

    //get data from ipfs
    let {productsArray} = this.state;
    let {updated} = this.state
    business.getStoreProduct(this.limit).then((ris)=>{
      if (ris === undefined){ris = []}
      if(updated === false) {
        this.setState({
          productsArray: ris,
          updated: true
        })
      }
    })
    let renderProducts = []

    //render searched products only
    for(var i=0; i<productsArray.length; i++){
      if(productsArray[i].title.toUpperCase().includes(props.searchProduct.toUpperCase()) || props.searchProduct === ""){
        renderProducts[i] = productsArray[i];
      }
    }
    return (
      <div>
        <h3>Store</h3>
        <div className="container">
          <div className="row">
            <SearchContainer />
            {renderProducts.map(i => this.printProduct(i))}
          </div>
        </div>
      </div>
    )
  }
}
export default Store;
