/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import ButtonGeneric from '../containers/ButtonGeneric';
/**
 * should load selected product's fields
 */
class EditProductsManager extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }
  render() {
    return (
      <div>
        <NavBar />
        <h3>Edit product</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
              <label htmlFor="InputTitle" className="form-group col-sm-12">
                <span>Title</span>
                <input className="form-control" id="InputTitle" placeholder="Enter Title" />
              </label>
              <label htmlFor="InputDescription" className="form-group col-sm-12">
                <span>Description</span>
                <input className="form-control" id="InputDescription" placeholder="Enter Description" />
              </label>
              <label htmlFor="InputNetPrice" className="form-group col-sm-12">
                <span>Net Price</span>
                <input className="form-control" id="InputNetPrice" placeholder="Enter Net Price in CC" />
              </label>
              <label htmlFor="InputVAT" className="form-group col-sm-12">
                <span>VAT</span>
                <input className="form-control" id="InputVAT" placeholder="Enter VAT in %" />
              </label>
              <div>
                <input type="file" onChange={this.handleChange} />
                <img src={this.state.file} />
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <NavLink className="nav-item nav-link" to="/productsmanager">
                      <ButtonGeneric text="Cancel" />
                    </NavLink>
                  </div>
                  <div className="col-sm-6">
                    <NavLink className="nav-item nav-link" to="/productsmanager">
                      <ButtonGeneric text="Confirm" args1={null} />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default EditProductsManager;
