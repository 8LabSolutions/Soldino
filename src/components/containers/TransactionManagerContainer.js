import { connect } from 'react-redux';
import TransactionsManager from '../presentational/TransactionsManager';
import businessActionCreator from '../../actionsCreator/businessActionCreator';

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
    }
  }
}

const mapStateToProps = (state) => {
  console.log('INVOICES')
  console.log(state.invoices);
  return {
    invoices: state.invoices,
    periods: state.periods
  }
}

const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default TransactionManagerContainer;
