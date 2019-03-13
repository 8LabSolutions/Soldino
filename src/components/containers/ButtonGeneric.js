import { connect } from 'react-redux';
import Button from '../presentational/Button';


const mapStateToProps = (state) => {
  return {
    logged: state.logged
  }
}

const mapDispatchToProps = () => {
  return {
    action: () => {
      null
    }
  }
}

const ButtonGeneric = connect(mapStateToProps, mapDispatchToProps)(Button);

export default ButtonGeneric;