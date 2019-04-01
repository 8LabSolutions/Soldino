import Web3 from 'web3'

var web3;

const getWeb3 = () => {
  var web3js;
  if (typeof web3 !== 'undefined' && typeof window != 'undefined') {
    web3js = new Web3(window.web3.currentProvider);
    return window.ethereum.enable();
  } else if(typeof web3 !== 'undefined'){
    web3js = new Web3(web3.currentProvider);
  } else{
    web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
  }
  return web3js;
}

export default getWeb3;
