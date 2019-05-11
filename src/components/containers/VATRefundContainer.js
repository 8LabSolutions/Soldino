import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications';
import VATRefund from '../presentational/VATRefund';
import governmentActionCreator from '../../actionsCreator/governmentActionCreator';
import { setPeriod, setVATrefund } from '../../actions/government';
import history from '../../store/history';
import { ERRORTOAST, SUCCESSTOAST, INFOTOAST, INFOTOASTAUTOHIDE } from '../../constants/fixedValues';
import userActionCreator from "../../actionsCreator/userActionCreator"
import { dateToPeriod } from '../../auxiliaryFunctions';
import { store } from '../../store';

/**
 * @description map the setVATRefund, getVATPeriods, resetPeriods, resetSearch, resetPeriod, resetVAT, setPeriod, setStatus, refund action into the VATRefund component
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  const { toastManager } = ownProps;

/**
 * @description Set a list into the redux store with businesses that have invoices for a specific period.
 * @param {*} period
 */
  function setVATRefund(period){
    governmentActionCreator.setVATrefund(period)
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
    setVATRefund: setVATRefund,

    /**
     * @description Get a list of periods with at least one invoice for the period and save it into the redux store.
     */
    getVATPeriods: function(){
      governmentActionCreator.getVATPeriods()
      .then((action)=>{
        //success
        dispatch(action)
      })
      .catch((err)=>{
        //error
        toastManager.add(err, ERRORTOAST);
      })
    },

    /**
     * @description Reset the periods list into redux store.
     */
    resetPeriods: function(){
      dispatch(governmentActionCreator.resetPeriods())
    },

    /**
     * @description Reset the searched string.
     */
    resetSearch: function(){
      dispatch(governmentActionCreator.resetSearch())
    },

    /**
     * @description Reset the selected period.
     */
    resetPeriod: function(){
      dispatch(governmentActionCreator.resetPeriod())
    },

    /**
     * @description Reset the list of the businesses that have invoices for a specific period.
     */
    resetVAT: function(){
      dispatch(governmentActionCreator.resetVAT())
    },

    /**
     * @description Set into the redux store a specific period for the future invoices search.
     * @param {*} period
     */
    setPeriod: function(period){
      dispatch(setPeriod(period))
      if(period.id !== dateToPeriod("Select a period")){
        //if period is real
        setVATRefund(period.id)
        toastManager.add("Retreiving data from IPFS.", INFOTOASTAUTOHIDE);
      }else{
        //if period is "Select a quarter"
        setVATrefund([])
      }
    },

   /**
     * @description Set into the redux store a specific status of businesses for the future invoices search.
     * @param {*} status
     */
    setStatus: function(status){
      dispatch(governmentActionCreator.setStatus(status))
    },

    /**
     * @description Refund a business period by paying it for a specific amount at its address.
     * @param {*} address
     * @param {*} period
     * @param {*} amount
     */
    refund : function(address, period, amount){
      let id
      toastManager.add("You have to approve MetaMask requests twice. You'll have to wait SOME MINUTES between the two confirmations.", INFOTOAST, (x)=>{id=x});
      //let id2;
      //toastManager.add(didYouKnowThat(), DIDYOUKNOWTOAST, (x)=>{id2=x})
      governmentActionCreator.refund(address, period, amount)
      .then(()=>{
        //success
        userActionCreator.updateBalance().then(dispatch)
        toastManager.remove(id)
        //toastManager.remove(id2)
        toastManager.add("Business refunded.", SUCCESSTOAST);
        dispatch(setPeriod(store.getState().selectedPeriod))
        setVATRefund(period.id)
        history.push("/vatrefund")
      })
      .catch((err)=>{
        //error
        toastManager.remove(id)
        //toastManager.remove(id2)
        toastManager.add(err, ERRORTOAST);
      })
    }
  }
}

/**
 * @description map the VATRefundList, searchProduct, selectedStatus, VATPeriods and selectedPeriod state values into the VATRefund component
 * @param {*} state
 */
const mapStateToProps = (state) => {
  return {
    VATRefundList: state.VATRefundList,
    searchProduct: state.searchProduct,
    selectedStatus: state.selectedStatus,
    VATPeriods: state.VATPeriods,
    selectedPeriod: state.selectedPeriod
  }
}

/**
 * @description connect the state and the action to the VATRefund props
 */
const VATRefundContainer = connect(mapStateToProps, mapDispatchToProps)(VATRefund);

export default withToastManager(VATRefundContainer);
