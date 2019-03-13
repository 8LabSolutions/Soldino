import React, {Component} from 'react';
import Product from './Product';

class Store extends Component {
  render() {
    return (
      <div>
        <h1>Store</h1>
        <div className="container">
          <div className="row">
            <Product title="Product 1" description="Some description" />
            <Product title="Product 2" description="Some description" />
            <Product title="Product 3" description="Some description" />
            <Product title="Product 4" description="Some description" />
            <Product title="Product 5" description="Some description" />
            <Product title="Product 6" description="Some description" />
            <Product title="Product 7" description="Some description" />
            <Product title="Product 8" description="Some description" />
            <Product title="Product 9" description="Some description" />
          </div>
        </div>
      </div>
    )
  }
}
export default Store;