import React, {Component} from 'react';
import Button from './Button';

class Product extends Component {
  render() {
    let props = this.props;
    return (
      <div className="col-sm-4">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <Button text="Add to cart" />
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default Product;