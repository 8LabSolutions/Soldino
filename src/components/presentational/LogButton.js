import React, {Component} from 'react';

class LogButton extends Component {
  render() {
    let props = this.props
    if(props.logged === false){
      return (
        <button type="button" onClick={props.logIn}>login</button>
      )
    }else{
      return (
        <button type="button" onClick={props.logOut}>logout</button>
      )
    }
  }
}

export default LogButton;
