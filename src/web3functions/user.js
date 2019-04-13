const web3user = (function(){

  return{
    getVATPeriod: function(){
      var today = new Date();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var period = parseInt(mm/4) +1
      return String(yyyy).concat("-").concat(String(period))
    }
  }

}());

export default web3user;
