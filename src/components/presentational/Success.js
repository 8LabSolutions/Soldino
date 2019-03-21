import React, {Component} from 'react';
import NavBar from "./NavBar";

class Success extends Component {
  render() {
    let props = this.props
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <br />
              <div className="alert alert-success">
                <strong>Success!</strong>
                <p>{props.successMessage}</p>
              </div>
              <p>{props.nextMessage}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Success;