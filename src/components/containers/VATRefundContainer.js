import { connect } from 'react-redux';
import VATRefund from '../presentational/VATRefund';
import governmentActionCreator from '../../actionsCreator/governmentActionCreator';
import { searchaction } from '../../actions/searchaction';
import { setStatus } from '../../actions/government';

const mapDispatchToProps = (dispatch) => {

  return {
    setVATRefund: function(){
      /*governmentActionCreator.setVATRefund().then((action)=>{
        dispatch(action)
      })*/
      dispatch(governmentActionCreator.setVATrefund()) //rimuovere questa linea
    },

    resetSearch: function(){
      dispatch(searchaction(""))
    },

    setStatus: function(status){
      dispatch(setStatus(status))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    VATRefundList: state.VATRefundList,
    searchProduct: state.searchProduct,
    selectedStatus : state.selectedStatus
  }
}

const VATRefundContainer = connect(mapStateToProps, mapDispatchToProps)(VATRefund);

export default VATRefundContainer;
