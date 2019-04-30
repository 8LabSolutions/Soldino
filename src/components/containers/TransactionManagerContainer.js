import { connect } from 'react-redux';
import TransactionsManager from '../presentational/TransactionsManager';

const mapDispatchToProps = (dispatch) => {
  //should dispatch the action that fills the store with the first 50 users
  //*!!! maybe only the first time !!!*/
  return {
    getInvoces: function(VATPeriod){
      console.log("VATPeriod"+VATPeriod)
      dispatch()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    invoices: state.invoices
  }
}

const TransactionManagerContainer = connect(mapStateToProps, mapDispatchToProps)(TransactionsManager);

export default TransactionManagerContainer;
