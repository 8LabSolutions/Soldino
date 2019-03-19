import React, {Component} from 'react';
import NavBar from "./NavBar";

class SuccessRegistration extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <br />
              <div className="alert alert-success">
                <strong>Success!</strong>
                <p>Registration completed.</p>
              </div>
              <p>Login and start using Soldino.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SuccessRegistration;