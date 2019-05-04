import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import TransactionsManager from '../presentational/TransactionsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import history from '../../store/history'
import { beginLoading, endLoading } from '../../actions/login';
import { selectedPeriod, resetInvoices } from '../../actions/business';
import { store } from '../../store';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';

const mapDispatchToProps = (dispatch, ownProps) => {

  const { toastManager } = ownProps;
  function getBusinessPeriods(){
    businessActionCreator.getBusinessPeriod()
    .then((action)=>{
      dispatch(action)
    })
    .catch((err)=>{
      toastManager.add(err, ERRORTOAST);
    })
  }

  return {
    getInvoices: function(VATPeriod){
      businessActionCreator.getInvoices(VATPeriod)
      .then((action)=>{
        dispatch(action)
      })
      .catch((err)=>{
        dispatch(endLoading())
        toastManager.add(err, ERRORTOAST);
      })
    },

    getBusinessPeriods: getBusinessPeriods,

    payVATPeriod: function(period, amount){
      dispatch(beginLoading())
      let id
      toastManager.add("You have to approve MetaMask requests twice. You'll have to wait SOME MINUTES between the two confirmations.", INFOTOAST, (x)=>{id=x});
      businessActionCreator.payVATPeriod(period, amount)
      .then(()=>{
        dispatch(endLoading())
        toastManager.add("VAT period paid.", SUCCESSTOAST);
        toastManager.remove(id)
        history.push("/transactionsmanager")
      })
      .catch((err)=>{
        dispatch(endLoading())
        toastManager.remove(id)
        toastManager.add(err, ERRORTOAST);
      })
    },

    putOnHoldVATPeriod: function(period){
      dispatch(beginLoading())
      businessActionCreator.putOnHoldVATPeriod(period)
      .then(()=>{
        dispatch(endLoading())
        getBusinessPeriods()
        dispatch(resetInvoices())
        toastManager.add("VAT period deferred.", SUCCESSTOAST);
        history.push("/transactionsmanager")
      })
      .catch((err)=>{
        dispatch(endLoading())
        toastManager.add(err, ERRORTOAST);
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

export default withToastManager(TransactionManagerContainer);
