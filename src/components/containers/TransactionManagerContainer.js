import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import TransactionsManager from '../presentational/TransactionsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';
import history from '../../store/history'
import { selectedPeriod, resetInvoices } from '../../actions/business';
import { store } from '../../store';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST } from '../../constants/fixedValues';

/**
 * @description map the getInvoices, getBusinessPeriods, payVATPeriod, putOnHoldVATPeriod, resetInvoices, selectPeriod action into the TransactionsManager component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;
  /**
   * @description Get all the periods related to a business.
   */
  function getBusinessPeriods(){
    businessActionCreator.getBusinessPeriod()
    .then((action)=>{
      //success
      dispatch(action)
    })
    .catch((err)=>{
      //error
      toastManager.add(err, ERRORTOAST);
    })
  }

  return {
    /**
     * @description Get all the invoices related to a business.
     * @param {*} VATPeriod of the invoices
     */
    getInvoices: function(VATPeriod){
      businessActionCreator.getInvoices(VATPeriod)
      .then((action)=>{
        //success
        dispatch(action)
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    getBusinessPeriods: getBusinessPeriods,

    /**
     * @description Pay the VAT debt of a period.
     * @param {*} period to pay
     * @param {*} amount of the period
     */
    payVATPeriod: function(period, amount){
      let id
      toastManager.add("You have to approve MetaMask requests twice. You'll have to wait SOME MINUTES between the two confirmations.", INFOTOAST, (x)=>{id=x});
      //let id2;
      //toastManager.add(didYouKnowThat(), DIDYOUKNOWTOAST, (x)=>{id2=x})
      businessActionCreator.payVATPeriod(period, amount)
      .then(()=>{
        //success
        toastManager.add("VAT period paid.", SUCCESSTOAST);
        toastManager.remove(id)
        //toastManager.remove(id2)
        history.push("/transactionsmanager")
      })
      .catch((err)=>{
        //error
        toastManager.remove(id)
        //toastManager.remove(id2)
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description Defer the payment of a period.
     * @param {*} period to defer
     */
    putOnHoldVATPeriod: function(period){
      businessActionCreator.putOnHoldVATPeriod(period)
      .then(()=>{
        //success
        getBusinessPeriods()
        dispatch(resetInvoices())
        toastManager.add("VAT period deferred.", SUCCESSTOAST);
        history.push("/transactionsmanager")
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description Reset the list of the invoices.
     */
    resetInvoices: function(){
      dispatch(resetInvoices())
    },

    /**
     * @description Select a period for showing the related invoices.
     * @param {*} period
     */
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

/**
 * @description map the selectedPeriod, invoices, periods, user.VATnumber state value into the TransactionsManager component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  let VATnumber = state.user;
  (VATnumber===null) ? VATnumber=0 : VATnumber=VATnumber.VATnumber
  return {
    selectedPeriod: state.selectedPeriod,
    invoices: state.invoices,
    periods: [{id: "Select a quarter", amount: null, payable: false}, ...state.periods],
    myVATnumber: VATnumber
  }
}

/**
 * @description connect the state and the action to the TransactionsManager props
 */
const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default withToastManager(TransactionManagerContainer);
