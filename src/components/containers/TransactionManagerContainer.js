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
  let VATnumber = state.user;
  (VATnumber===null) ? VATnumber=0 : VATnumber=VATnumber.VATnumber
  return {
    invoices: state.invoices,
    periods: state.periods,
    periodJSON : [{
      id: "2018-4", //Q da 1 a 4
      amount: 200,
      deferred: false, //dilazionato --> data ultima pagamento
      defereable: false,
      payable: false,
      resolved: true,
      outOfLimit: false
    },
    {
      id: "2019-1", //Q da 1 a 4
      amount: -200,
      deferred: true, //dilazionato --> data ultima pagamento
      defereable: false,
      payable: true,
      resolved: false,
      outOfLimit: false
    }],
    myVATnumber: VATnumber
  }
}

const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default TransactionManagerContainer;
