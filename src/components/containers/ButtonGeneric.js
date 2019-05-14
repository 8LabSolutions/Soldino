import { connect } from 'react-redux';
import Button from '../presentational/Button';

/**
 * @description map the action into the Button component
 * @param {*} dispatch
 */
const mapDispatchToProps = () => {
  return {
    /**
     * @description Do nothing on click.
     */
    action: () => {
      return null
    }
  }
}

/**
 * @description connect the action to the Button props
 */
const ButtonGeneric = connect(null, mapDispatchToProps)(Button);

export default ButtonGeneric;
