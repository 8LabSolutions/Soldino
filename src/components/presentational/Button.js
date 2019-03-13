import React, {Component} from 'react';

class Button extends Component {
  render() {
    let props = this.props;
    return (
      <button type="button" className="btn btn-light" onClick={props.action}>{props.text}</button>
    )
  }
}

export default Button;