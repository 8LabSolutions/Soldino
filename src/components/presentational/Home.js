import React, {Component} from 'react';
import NavBar from './NavBar'
import FormRegistration from './FormRegistration'

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Home</h1>
              <FormRegistration />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home;