import React, {Component} from 'react';

class Button extends Component {
  render() {
    let props = this.props;
    if(props.logged === false){
      return (
        <input type="button" value="Login" onClick={props.logIn} />
      )
    }else{
      return (
        <input type="button" value="Logout" onClick={props.logOut} />
      )
    }
  }
}

export default Button;