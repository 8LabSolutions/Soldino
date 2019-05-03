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
      return new Promise((resolve)=>{
        web3government.getInvoicesGovernment().then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash).then(resolve)
              })
            )
          });
          Promise.all(invoicesJSON).then((ris)=>{
            //get the date, then the periods
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
                    let sellerAddress = invoicesJSON.products[0].seller;
                    if (!businessAddresses.includes(sellerAddress))
                      businessAddresses.push(sellerAddress);
                    //the buyer must be inserted only if it is a business
                    let buyerAddress = invoicesJSON.buyerAddress;
                    web3authentication.getUser(buyerAddress).then(([,,type])=>{
                      if(parseInt(type) === 2)
                        if (!businessAddresses.includes(buyerAddress))
                          businessAddresses.push(buyerAddress);
                      resolve()
                    })
                  }
                })
              )
            }
            Promise.all(busAdrPromises).then(()=>{
              //businessAddresses contains all the useful addresses
              resolve(businessAddresses)
            })
          })
        })
      })
    }



  return {
    /**
     * @description Enable the passed account
     * @param {} userAddress account address to be enabled
     */
    enableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3government.enableAccount(userAddress).then(resolve);
      })
    },

    /**
     * @description Disabled the passed account
     * @param {} userAddress account address to be disabled
     */
    disableAccount: function(userAddress){
      return new Promise((resolve)=>{
        web3government.disableAccount(userAddress).then(resolve);
      })
    },

    mint: function(amount){
      return new Promise((resolve)=>{
        web3government.mint(amount).then(resolve);
      })
    },

    distribute: function(amount, address){

      if(address.length > 1){
        return new Promise((resolve)=>{
          web3government.distributeToMultipleAddresses(address, amount).then(resolve);
        })
      }
      else{
        return new Promise((resolve)=>{
          web3government.distribute(amount, address[0]).then(resolve);
        })
      }
    },

    refundVAT: function(businessAddress, period){
      return new Promise((resolve)=>{
        web3government.refundVAT(businessAddress, period).then(resolve);
      })
    },
    /**
     * @description return an array of JSON to display the citizen info to the government:
     * name, surname, email, address, state
     * @param {*} amount number of citizen
     * @param {*} index skipping the first index*amount citizen
     */
    getCitizenList: function(amount, index = 0){
      return new Promise((resolve)=>{
        web3government.getUserList(1, amount, index).then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)
          var citizensJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            citizensJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1]).then(resolve)
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
        })
      })
    },
    /**
     * @return Return the JSONs of the businesses as requested
     *
     * @param {*} amount how many business you want
     * @param {*} index from which to start getting the info, starting from index*amount
     */
    getBusinessList: function(amount, index = 0){
      return new Promise((resolve)=>{
        web3government.getUserList(2, amount, index).then((resultsArray)=>{
          //resultsArray content: array with 0:address, 1: hashIPFS, 2: userState (dis/able)

          var businessJSON = [];
          for(let i = 0; i < resultsArray.length; i++){
            businessJSON.push(new Promise((resolve)=>{
              ipfsModule.getJSONfromHash(resultsArray[i][1])
              .then(resolve)
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
        })
      })
    },

    getTotalCubit: function(){
      return new Promise((resolve)=>{
        web3government.getTotalCubit()
        .then(resolve)
      })
    },
    /**
     * @returns Return an array with all the IDs (e.g., 2019-2) of the periods with at least a transaction
     */
    getPeriods: function() {
      return new Promise((resolve)=>{
        web3government.getInvoicesGovernment()
        .then((invoicesIPFSHash)=>{
          var invoicesJSON = []
          invoicesIPFSHash.forEach(invoceIPFSHash => {
            invoicesJSON.push(
              new Promise((resolve)=>{
                ipfsModule.getJSONfromHash(invoceIPFSHash)
                .then(resolve)
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
        })
      })
    },
    /**
     *
     * @param {*} period the period you want the businesses' state
     */
    getBusinessVATState: function(period){
      return new Promise((resolve)=>{
        //getting the businesses' addresses
        var businessAddresses = getBusinessActiveInPeriod(period);

        //creating the VAT keys with the period+business's address

        var keyPromises = [];
        businessAddresses.forEach((address)=>{
          keyPromises.push(new Promise((resolve)=>{
            web3government.getVATQuarterInfo(period, address)
            .then(resolve)
          }))
        })
        Promise.all(keyPromises)
        .then((businessVATData)=>{
          //businessVATData is an array of array with the following format
          //[businessAddress, paymentStatus, amount]
          let promises = []
          for(let i = 0; i < businessVATData.length; i++){
            promises.push(new Promise((resolve)=>{
              web3authentication.getUser(businessAddresses[i].businessAddress)
              .then(([IPFSHash,,])=>{
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
                  switch (businessVATData[i].paymentStatus) {
                    case 0:
                    //DUE: the business must pay
                      //check if it is late or in time (paying or late)
                      if(((currYear-oldYear)*4+(currMonth-oldMonth))>1){
                        paymentStatus = "late";
                      }
                      else {
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
                  }

                  //adding the paymentStatus and amount to the business JSON

                  businessJSON.paymentStatus = paymentStatus;
                  businessJSON.amount = businessVATData[i].amount;

                  resolve(businessJSON)
                })
              })
            }))
          }
          Promise.all(promises)
          .then(resolve)
        })
      })
    },

    refund: function(period, business){
      return new Promise((resolve)=>{
        web3government.refundVAT(business, period)
        .then(resolve)
      })

    }

  }
}());

export default government;
