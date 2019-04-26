/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import ButtonBusinessProduct from '../containers/ButtonBusinessProduct';
import ButtonGeneric from '../containers/ButtonGeneric';
import { store } from '../../store';
import { checkBusiness } from '../../auxiliaryFunctions';

class AddProductsManager extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      url: null,
      title: "",
      description: "",
      netPrice: "",
      vatPercentage: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeField = this.handleChangeField.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: event.target.files,
      url: URL.createObjectURL(event.target.files[0])
    })
    console.log(event.target.files)
  }
  handleChangeField(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  render() {
    if(!checkBusiness()){window.location.href = "/"}
    return (
      <div>
        <NavBar />
        <h3>Add new product</h3>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
              <label htmlFor="InputTitle" className="form-group col-sm-12">
                <span>Title</span>
                <input className="form-control" id="InputTitle" placeholder="Enter Title" name="title" onChange={this.handleChangeField} maxLength="28" />
              </label>
              <label htmlFor="InputDescription" className="form-group col-sm-12">
                <span>Description</span>
                <input className="form-control" id="InputDescription" placeholder="Enter Description" name="description" onChange={this.handleChangeField} />
              </label>
              <label htmlFor="InputNetPrice" className="form-group col-sm-12">
                <span>Net Price</span>
                <input type="number" className="form-control" id="InputNetPrice" placeholder="Enter Net Price in CC" name="netPrice" onChange={this.handleChangeField}  />
              </label>
              <label htmlFor="InputVAT" className="form-group col-sm-12">
                <span>VAT</span>
                <input type="number" className="form-control" id="InputVAT" placeholder="Enter VAT in %" name="vatPercentage" onChange={this.handleChangeField} />
              </label>
              <div className="form-group col-sm-12">
                <input type="file" id="imageUploader" onChange={this.handleChange} />
                <label for="imageUploader">
                  <span className="btn btn-light" id="spanUploader">Choose an image</span>
                </label>
                <img id="uploadedImage" src={this.state.url} />
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
                      <ButtonBusinessProduct text="Confirm" args1={[this.state.title, this.state.description, this.state.netPrice, this.state.vatPercentage, this.state.file, store.getState().user.name, store.getState().user.VATnumber]} />
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
export default AddProductsManager;
