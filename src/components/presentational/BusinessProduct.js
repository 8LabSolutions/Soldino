/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, {Component} from 'react';

class BusinessProduct extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    return (
      <div className="col-sm-3">
        <div className="card">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p> 
            <p className="card-text">CC {props.price - (props.price * (props.VAT/100))}</p> {/*net price*/}
            <p className="card-text">CC {(props.price * (props.VAT/100))} ~ {props.VAT}%</p>  
          </div>
        </div>
        <br />
      </div>
    )
  }
}

export default BusinessProduct;
