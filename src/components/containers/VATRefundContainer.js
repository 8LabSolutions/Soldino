import { connect } from 'react-redux';
import VATRefund from '../presentational/VATRefund';
import governmentActionCreator from '../../actionsCreator/governmentActionCreator';
import { setPeriod, setVATrefund } from '../../actions/government';
import history from '../../store/history';
import { beginLoading, endLoading } from '../../actions/login';

const mapDispatchToProps = (dispatch) => {

  function setVATRefund(period){
    governmentActionCreator.setVATrefund(period)
    .then((action)=>{
      console.log("SETVATREFUNDACTION")
      console.log(action)
      dispatch(action)
    })
  }

  return {
    setVATRefund: setVATRefund,

    getVATPeriods: function(){
      governmentActionCreator.getVATPeriods()
      .then((action)=>{
        dispatch(action)
      })
    },

    resetPeriods: function(){
      dispatch(governmentActionCreator.resetPeriods())
    },

    resetSearch: function(){
      dispatch(governmentActionCreator.resetSearch())
    },

    resetPeriod: function(){
      dispatch(governmentActionCreator.resetPeriod())
    },

    setPeriod: function(period){
      dispatch(setPeriod(period))
      if(period.id !== "Select a quarter"){
        setVATRefund(period.id)
      }else{
        setVATrefund([])
      }
    },

    setStatus: function(status){
      dispatch(governmentActionCreator.setStatus(status))
    },

    refund : function(address, period, amount){
      dispatch(beginLoading())
      governmentActionCreator.refund(address, period, amount)
      .then(()=>{
        dispatch(endLoading())
        history.push("/vatrefund")
      })
      .catch(()=>{
        dispatch(endLoading())
      })


    }
  }
}

const mapStateToProps = (state) => {
  return {
    VATRefundList: state.VATRefundList,
    searchProduct: state.searchProduct,
    selectedStatus: state.selectedStatus,
    VATPeriods: state.VATPeriods,
    selectedPeriod: state.selectedPeriod
  }
}

const VATRefundContainer = connect(mapStateToProps, mapDispatchToProps)(VATRefund);

export default VATRefundContainer;
