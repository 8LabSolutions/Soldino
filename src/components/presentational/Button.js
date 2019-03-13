import React, {Component} from 'react';

/*
 * Each <Button /> hash two main props:
 *  -text: the text that is displayed inside it
 *  -action: the action that is sent to the dispatcher
 * 
 * These two params are managed by the <Button /> containers and by the components that implements them, for example:
 *  -ButtonGeneric has no action
 *  -ButtonAuth has only two actions mapped to 'action': logIn or logOut
 *  -NavBar uses ButtonAuth and its 'text' param with "Login" or "Logout"
 */

class Button extends Component {
  render() {
    let props = this.props;
    return (
      <button type="button" className="btn btn-light" onClick={props.action}>{props.text}</button>
    )
  }
}

export default Button;