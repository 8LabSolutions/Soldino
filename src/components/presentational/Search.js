/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {Component} from 'react';

class Search extends Component {
  render() {
    let props = this.props;
    return (
      <div className="col-sm-12">
        <input className="form-control" id="searchbar" onKeyDown={
          (key)=> {
            if((key.keyCode >= 48 && key.keyCode <= 57)||(key.keyCode >= 65 && key.keyCode <= 90)||(key.keyCode >= 97 && key.keyCode <= 122)){
              props.action(document.getElementById('searchbar').value+key.key)
            }else if(key.key==="Backspace"){
              var length = document.getElementById('searchbar').value.length
              props.action(document.getElementById('searchbar').value.substring(0, length-1))
            }
          }
          } type="text" placeholder="Search" aria-label="Search" />
        <br />
      </div>
    )
  }
}

export default Search;
