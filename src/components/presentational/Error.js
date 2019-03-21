import React, {Component} from 'react';
import NavBar from "./NavBar";

class Error extends Component {
  render() {
    let props = this.props
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <br />
              <div className="alert alert-danger">
                <strong>Erorr!</strong>
                <p>{props.errorMessage}</p>
              </div>
              <p>{props.nextMessage}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Error;