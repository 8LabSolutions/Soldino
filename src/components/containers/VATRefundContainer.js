import { connect } from 'react-redux';
import VATRefund from '../presentational/VATRefund';
import governmentActionCreator from '../../actionsCreator/governmentActionCreator';
import { searchaction } from '../../actions/searchaction';
import { setStatus, resetPeriod, setPeriod, resetVATPeriods } from '../../actions/government';
import { store } from '../../store';
import { SETVATREFUND, MINTANDDISTRIBUTE } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => {

  return {
    setVATRefund: function(period){
      /*governmentActionCreator.setVATRefund().then((action)=>{
        dispatch(action)
      })*/
      let newList = governmentActionCreator.setVATrefund(period)
      let oldList = {
        type: SETVATREFUND,
        VATRefundList: store.getState().VATRefundList
      }
      console.log([newList, oldList])
      let equals = true
      if(newList.VATRefundList.length!==oldList.VATRefundList.length){
        equals = false
      }else{
        for(let i=0; i<oldList.VATRefundList.length; i++){
          if(i.name===newList.VATRefundList.name &&
             i.VATnumber===newList.VATRefundList.VATnumber &&
             i.paymentStatus===newList.VATRefundList.paymentStatus &&
             i.amount===newList.VATRefundList.amount &&
             i.address===newList.VATRefundList.address &&
             equals===true){
              equals=true
            }else{
              equals=false
            }
        }
      }
      if(equals===false){
        dispatch(newList) //rimuovere questa linea
      }
    },

    getVATPeriods: function(){
      dispatch(governmentActionCreator.getVATPeriods()) //rimuovere questa linea
    },

    resetPeriods: function(){
      dispatch(resetVATPeriods())
    },

    resetSearch: function(){
      dispatch(searchaction(""))
    },

    resetPeriod: function(){
      dispatch(resetPeriod())
    },

    setPeriod: function(period){
      dispatch(setPeriod(period))
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
    selectedStatus: state.selectedStatus,
    VATPeriods: state.VATPeriods,
    selectedPeriod: state.selectedPeriod
  }
}

const VATRefundContainer = connect(mapStateToProps, mapDispatchToProps)(VATRefund);

export default VATRefundContainer;
