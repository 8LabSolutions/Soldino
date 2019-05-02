import { connect } from 'react-redux';
import TransactionsManager from '../presentational/TransactionsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import history from '../../store/history'
import { beginLoading, endLoading } from '../../actions/login';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getInvoices: function(VATPeriod){
      businessActionCreator.getInvoices(VATPeriod).then((action)=>{
        dispatch(action)
      })
    },

    getBusinessPeriods: function(){
      businessActionCreator.getBusinessPeriod().then((action)=>{
        dispatch(action)
      })
    },

    payVATPeriod: function(period){
      dispatch(beginLoading())
      businessActionCreator.payVATPeriod(period)
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
        history.push("/transactionsmanager")
      })
    }
  }
}

const mapStateToProps = (state) => {
  console.log('INVOICES')
  console.log(state.invoices);
  let VATnumber = state.user;
  (VATnumber===null) ? VATnumber=0 : VATnumber=VATnumber.VATnumber 
  return {
    invoices: state.invoices,
    periods: [...state.periods, {id: '2019-3', payable: true}],
    myVATnumber: VATnumber
  }
}

const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default TransactionManagerContainer;
