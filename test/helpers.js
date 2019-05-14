import Web3 from 'web3'

var truffle = require('../truffle-config')

const port = truffle.networks.coverage.port;

const getWeb3 = () => {
  var web3js;
  if (typeof web3 !== 'undefined' && typeof window != 'undefined') {
    web3js = new Web3(window.web3.currentProvider);
    return window.ethereum.enable();
  } else if(typeof web3 !== 'undefined'){
    web3js = new Web3(web3.currentProvider);
  } else{
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:"+port+""));
    console.log('connected to port '+port)
  }
  return web3js;
}

const getContractInstance = (web3) => (contractName, from) => {
  const artifact = artifacts.require(contractName)

  const instance = new web3.eth.Contract(artifact.abi, {
    data: artifact.bytecode,
    gas: 5000000,
    from
  })

  return instance
}
module.exports = {getWeb3, getContractInstance}
