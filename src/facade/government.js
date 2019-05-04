import web3government from "../web3functions/government"
import ipfsModule from "../ipfsCalls/index"
import web3util from "../web3functions/web_util";
import web3authentication from "../web3functions/authentication"

const government = (function(){
  /**
     *
     * @returns An array containing all the business addresses with at least a transaction in the given period
     *
     * @param {*} period the period IDs (e.g., 2019-2) you want to get the business list
     */
    function getBusinessActiveInPeriod(period){
      return new Promise((resolve, reject)=>{
        web3government.getInvoicesGovernment()
        .then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve,reject)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash)
                .then(resolve)
                .catch(reject)
              })
            )
          });
          Promise.all(invoicesJSON)
          .then((ris)=>{
            //get the date, then the periods
            invoicesJSON = ris
            var dates = []
            ris.forEach(json => {
              dates.push(json.date);
            });

            var periods = []
            dates.forEach(date=>{
              var [year, month,] = date.split("/");
              let newPeriod = web3util.getVATPeriod(month, year);
              periods.push(newPeriod);
            })
            //now there are three arrays, invoiceJSON, date and periods
            //getting the businesses' address which have at least a transaction in the given period
            var businessAddresses = []
            let busAdrPromises = []

            for (let i = 0; i < invoicesJSON.length; i++ ){
              busAdrPromises.push(
                new Promise((resolve)=>{
                  if(periods[i] === period){
                    //the selling business must be inserted
                    let sellerAddress = invoicesJSON[i].products[0].seller;
                    if (!businessAddresses.includes(sellerAddress))
                      businessAddresses.push(sellerAddress);
                    //the buyer must be inserted only if it is a business
                    let buyerAddress = invoicesJSON[i].buyerAddress;
                    web3authentication.getUser(buyerAddress)
                    .then(([,,type])=>{
                      if(parseInt(type) === 2)
                        if (!businessAddresses.includes(buyerAddress))
                          businessAddresses.push(buyerAddress);
                      resolve()
                    })
                    .catch(reject)
                  }
                })
              )
            }
            Promise.all(busAdrPromises)
            .then(()=>{
              //businessAddresses contains all the useful addresses
              resolve(businessAddresses)
            })
            .catch(reject)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    }

  return {
    /**
     * @description Enable the passed account
     * @param {} userAddress account address to be enabled
     */
    enableAccount: function(userAddress){
      return new Promise((resolve, reject)=>{
        web3government.enableAccount(userAddress)
        .then(resolve)
        .catch(reject)
      })
    },

    /**
     * @description Disabled the passed account
     * @param {} userAddress account address to be disabled
     */
    disableAccount: function(userAddress){
      return new Promise((resolve, reject)=>{
        web3government.disableAccount(userAddress)
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise that resolves if the amount passed has been mined,
     * reject with an error otherwise
     * @param {*} amount
     */
    mint: function(amount){
      return new Promise((resolve, reject)=>{
        web3government.mint(amount)
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @description Returns a promise that resolves if the amount passed has been transfered
     * to the given addresses, reject with an error otherwise
     * @param {*} amount The amount of Cubit to be transferred
     * @param {*} address The addresses to transfer the Cubit to
     */
    distribute: function(amount, address){
      if(address.length > 1){
        return new Promise((resolve, reject)=>{
          web3government.distributeToMultipleAddresses(address, amount)
          .then(resolve)
          .catch(reject)
        })
      }
      else{
        return new Promise((resolve, reject)=>{
          web3government.distribute(amount, address[0])
          .then(resolve)
          .catch(reject)
        })
      }
    },
     /**
     * @describe Refund the business on the VAT period passed
     * @param {*} businessAddress business address you want to pay
     * @param {*} period the VAT period you want to refund
     */
    refundVAT: function(businessAddress, period){
      return new Promise((resolve, reject)=>{
        web3government.refundVAT(businessAddress, period)
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @description return an array of JSON to display the citizen info to the government:
     * name, surname, email, address, state
     * @param {*} amount number of citizen
     * @param {*} index skipping the first index*amount citizen
     */
    getCitizenList: function(amount, index = 0){
      return new Promise((resolve, reject)=>{
        web3government.getUserList(1, amount, index)
        .then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)
          var citizensJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            citizensJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1])
              .then(resolve)
              .catch(reject)
            }))
          }

          var citizens = [];
          //get all the citizen JSON
          Promise.all(citizensJSON)
          .then((results)=>{
            for(let i = 0; i < results.length; i++){
              citizens.push({
                name: results[i].name,
                surname: results[i].surname,
                email: results[i].email,
                address: resultsArray[i][0],
                state: resultsArray[i][2],
                district: results[i].district,
                postCode: results[i].postCode,
                streetName: results[i].streetName,
                streetNumber: results[i].streetNumber
              })
            }
            resolve(citizens)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @return Return the JSONs of the businesses as requested
     *
     * @param {*} amount how many business you want
     * @param {*} index from which to start getting the info, starting from index*amount
     */
    getBusinessList: function(amount, index = 0){
      return new Promise((resolve, reject)=>{
        web3government.getUserList(2, amount, index)
        .then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)

          var businessJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            businessJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1])
              .then(resolve)
              .catch(reject)
            }))
          }
          var business = [];
          //get all the citizen JSON
          Promise.all(businessJSON)
          .then((results)=>{
            for(let i = 0; i < results.length; i++){
              business.push({
                name: results[i].name,
                VATnumber: results[i].VATnumber,
                email: results[i].email,
                address: resultsArray[i][0],
                state: resultsArray[i][2],
                district: results[i].district,
                postCode: results[i].postCode,
                streetName: results[i].streetName,
                streetNumber: results[i].streetNumber
              })
            }
            resolve(business)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
   * @returns The function returns a promise that resolves with the current total supply of Cubit on Soldino
   */
    getTotalCubit: function(){
      return new Promise((resolve, reject)=>{
        web3government.getTotalCubit()
        .then(resolve)
        .catch(reject)
      })
    },
    /**
     * @returns Return a promise that resolves an array with all the
     *  IDs (e.g., 2019-2) of the periods with at least a transaction
     */
    getPeriods: function() {
      return new Promise((resolve, reject)=>{
        web3government.getInvoicesGovernment()
        .then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash)
                .then(resolve)
                .catch(reject)
              })
            )
          });
          Promise.all(invoicesJSON)
          .then((ris)=>{
            //get the date, then the periods
            var dates = []
            ris.forEach(json => {
              if(!dates.includes(json.date))
                dates.push(json.date);
            });

            var periods = []
            dates.forEach(date=>{
              var [year, month,] = date.split("/");
              let newPeriod = web3util.getVATPeriod(month, year);
              if (!periods.includes(newPeriod))
                periods.push(newPeriod);
            })
            resolve(periods)
          })
          .catch(reject)
        })
        .catch(reject)
      })
    },
    /**
     * @returns Return a promise that resolves an array containing all the businesses
     * with the related VAT state of [period]
     * @param {*} period the period you want the businesses' state
     */
    getBusinessVATState: function(period){
      return new Promise((resolve, reject)=>{
        //getting the businesses' addresses

        getBusinessActiveInPeriod(period)
        .then((businessAddresses)=>{
          var keyPromises = [];
          businessAddresses.forEach((address)=>{
            keyPromises.push(new Promise((resolve)=>{
              web3government.getVATQuarterInfo(period, address)
              .then(resolve)
              .catch(reject)
            }))
          })
          Promise.all(keyPromises)
          .then((businessVATData)=>{
            //businessVATData is an array of array with the following format
            //[businessAddress, paymentStatus, amount]
            let promises = []
            for(let i = 0; i < businessVATData.length; i++){
              promises.push(new Promise((resolve)=>{
                console.log("business")
                console.log(businessVATData[i])
                web3authentication.getUser(businessVATData[i][0])
                .then(([IPFSHash,,])=>{
                  console.log("Eccolo qua")
                  console.log(IPFSHash)
                  ipfsModule.getJSONfromHash(IPFSHash)
                  .then((businessJSON)=>{
                    let paymentStatus = undefined;

                    let currentVATPeriod = web3util.getVATPeriod();
                    let oldVATPeriod = period;

                    let [currYear, currMonth] = currentVATPeriod.split("-");
                    let [oldYear, oldMonth] = oldVATPeriod.split("-");

                    [currYear, currMonth] = currentVATPeriod.split("-");
                    [oldYear, oldMonth] = oldVATPeriod.split("-");

                    /* paymentStatus Options
                      payed --> verde
                      deferred --> yellow
                      paying --> yellow
                      waiting --> yellow
                      late --> red
                    */
                    //set the state
                    switch (parseInt(businessVATData[i][1])) {
                      case 0:
                      //DUE: the business must pay
                        //check if it is late or in time (paying or late)
                        if(((currYear-oldYear)*4+(currMonth-oldMonth))>1){
                          paymentStatus = "late";
                        }
                        else {
                          if(((currYear-oldYear)*4+(currMonth-oldMonth)) === 0){
                            //current period ->
                            paymentStatus = "current"
                          }
                          paymentStatus = "paying";
                        }
                        break;
                      case 1:
                      //OVERDUE: deferred payment
                      //check if it is late or in time (paying or late)
                        if(((currYear-oldYear)*4+(currMonth-oldMonth))>2){
                          paymentStatus = "late";
                        }
                        else {
                          paymentStatus = "deferred";
                        }
                        break;
                      case 2:
                      //PAID: the business paid the VAT
                        paymentStatus = "payed";
                        break;
                      case 3:
                      //TO_BE_REFUNDED: the government must pay the VAT
                        paymentStatus = "waiting";
                        break;
                      case 4:
                      //REFUNDED: the govenment refunded the VAT
                        paymentStatus = "payed";
                        break;
                      default:
                        reject("Wrong paymentStatus passed")
                    }

                    //adding the paymentStatus and amount to the business JSON

                    businessJSON.paymentStatus = paymentStatus;
                    businessJSON.amount = businessVATData[i][2];
                    businessJSON.address = businessVATData[i][0];
                    resolve(businessJSON)
                  })
                  .catch(reject)
                })
                .catch(reject)
              }))
            }
            Promise.all(promises)
            .then(resolve)
            .catch(reject)
          })
          .catch(reject)
          })
        .catch(reject)
      })
    },
    /**
     * @returns The function returns a promise that resolves if the business
     *  has been correctly refunded, otherwise rejects with an error
     * @param {*} period The period you want to refund
     * @param {*} business The business address to be refunded
     * @param {*} amount The amount to be refunded
     */
    refund: function(period, business, amount){
      return new Promise((resolve, reject)=>{
        web3government.refundVAT(business, period, amount)
        .then(resolve)
        .catch(reject)
      })
    }
  }
}());

export default government;
