import { connect } from 'react-redux';
import TransactionsManager from '../presentational/TransactionsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import history from '../../store/history'
import { beginLoading, endLoading } from '../../actions/login';
import { selectedPeriod, resetInvoices } from '../../actions/business';
import { store } from '../../store';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  function getBusinessPeriods(){
    businessActionCreator.getBusinessPeriod().then((action)=>{
      dispatch(action)
    })
  }

  return {
    getInvoices: function(VATPeriod){
      businessActionCreator.getInvoices(VATPeriod).then((action)=>{
        dispatch(action)
      })
    },

    getBusinessPeriods: getBusinessPeriods,

    payVATPeriod: function(period, amount){
      dispatch(beginLoading())
      businessActionCreator.payVATPeriod(period, amount)
      .then(()=>{
        dispatch(endLoading())
        history.push("/transactionsmanager")
      })
    },

    putOnHoldVATPeriod: function(period){
      dispatch(beginLoading())
      businessActionCreator.putOnHoldVATPeriod(period)
      .then(()=>{
        dispatch(endLoading())
        getBusinessPeriods()
        dispatch(resetInvoices())
        history.push("/transactionsmanager")
      })
    },

    resetInvoices: function(){
      dispatch(resetInvoices())
    },

    selectPeriod: function(period){
      let periods = store.getState().periods
      for(let i=0; i<periods.length; i++){
        if(period===periods[i].id){
          dispatch(selectedPeriod(periods[i]))
        }
      }
    }
  }
}

const mapStateToProps = (state) => {
  let VATnumber = state.user;
  (VATnumber===null) ? VATnumber=0 : VATnumber=VATnumber.VATnumber
  return {
    selectedPeriod: state.selectedPeriod,
    invoices: state.invoices,
    //periods: [state.selectedPeriod, ...state.periods, {id: '2019-3', payable: true, amount: 200}],
    periods: [{id: "Select a quarter", amount: null, payable: false}, ...state.periods],
    myVATnumber: VATnumber
  }
}

const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default TransactionManagerContainer;
