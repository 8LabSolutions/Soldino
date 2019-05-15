# Soldino

## Table of contents

- [References](#references)
- [Getting started](#getting-started)
- [Installation](#installation)
  * [Ubuntu](#ubuntu)
  * [Windows](#windows)
  * [Content of the repository](#content-of-the-repository)
- [Ropsten](#contracts-on-ropsten)
+ [Authors](#authors)

## References

https://www.math.unipd.it/~tullio/IS-1/2018/Progetto/C6.pdf

Software Engineering project at University of Padua, developed for [Red Babel](http://redbabel.com/), by 8Lab Solutions.

## Getting started

In order to run Soldino you **must** have:

- `git`
- `nodejs v10.15.1` or later [see references](https://nodejs.org/en/)
- `npm v3.5.2` or later [see references](https://www.npmjs.com/get-npm)
- `truffle v5.0.5`   [ see references](https://www.truffleframework.com/docs/truffle/getting-started/installation)
- one or both: 
  - `Ganache GUI`  if you want an user interface for the local blockchain.
  - `ganache-cli` if you want fast local blockchain on command line.
- `metamask plugin` for `Google Chrome v64 or later` or `Mozilla Firefox v71 or later`

**Note** : *both* `Ganache GUI` *and* `ganache-cli` *(this is provided by default)*   **must**   *be set with port 9545 in order to run Soldino on the development environment, this port can be set later.*

## Installation

### Ubuntu

1. download or clone (`git clone https://github.com/8LabSolutions/Soldino-PoC.git` ) this repository 
2. run `$ npm install` in the repository folder (`Soldino-PoC` folder), it may take a while
   - If you have trouble with `$ npm install` run `$ sudo apt-get install build-essential` and retry run `npm install`
3. done!

### Windows

1. download or clone (`git clone https://github.com/8LabSolutions/Soldino-PoC.git` ) this repository
2. run `$ npm install` in the repository folder (`Soldino-PoC` folder), it may take a while
   - If you have trouble try this solution: [Microsoft.cpp.default.props not found(first answer)](https://stackoverflow.com/questions/41695251/c-microsoft-cpp-default-props-was-not-found) and retry run `npm install`
3. done!

**Note: npm run coverage doesn't work on Windows, so you can't use the coverage environment.**

### Content of the repository

The project's folders are organized in this way:

```
├── contracts/ (all solidity contracts' files)
|      ├── logic/ (logic contracts)
|      └── storage/ (storage contracts)
├── migration (files used to migrate contracts)
├── src/ (redux-react, web3 and ipfs folder)
|      ├── actions/ (all redux actions)
|      ├── actionCreators/ (all redux action creators)
|      ├── auxiliaryFunctions/ (utils functions for react and redux )
|      ├── components/
|      |    ├── containers/ (redux containers)
|      |    └── presentational/ (react presentational components)
|      ├── constants/ (utils for redux)
|      ├── contracts_build/ (jsons of contracts)
|      ├── facade/ (users classes)
|      ├── ipfsCalls/ (utils functions for connection to ipfs)
|      ├── reducers/ (all redux reducers)
|      ├── store/ (redux store)
|      ├── styles/ (css files)
|      └── web3functions/ (utils functions for connection to web3)
└── test/ (classes test system)
```

The folders organization separates the back end ad front end. 

------


## Contracts on Ropsten
The following table shows all addresses of contracts deployed on Ropsten testnet.

| Contract Name 	| Address 	|
|-----------------	|--------------------------------------------	|
| ContractManager 	| 0x9B100eDD94153eB36d2B1834d6521fa77D7DB1BE 	|
| TokenCubit 	| 0x74B9cca5Ae48246624F32731bFEb0132b23B5954 	|
| Purchase 	| 0xD6D6a403B0578F5A921063c5886D2e756B972510 	|
| UserStorage 	| 0x71Ba92391d6a9e154c3efD69235c073a3964f001 	|
| UserLogic 	| 0x1EcaDb432122C026C09ee15254c7aCCdf355ADcB 	|
| ProductStorage 	| 0x1D8b52E19DC821b5CC92DEEf90ffc290488EbAdD 	|
| ProductLogic 	| 0x584Faf63b83afce744adD08a94CbFED4a4634531 	|
| VatStorage 	| 0x3ec469C9ac71d15221CB972C9806A5B1bf4ae73B 	|
| VatLogic 	| 0xa31523460085D5CC2AE048b3b014DE09Fe5C7166 	|
| OrderStorage 	| 0xb3d03B5E96e16BE2923ec1da7be60fa1044d29BE 	|
| OrderLogic 	| 0x7fB927297B7E8133021E2bB7CA849c3c06a41D8c 	|

## Authors

- [Federico Bicciato](https://github.com/nevepura)
- [Mattia Bolzonella](https://github.com/KamiShire)
- [Francesco Donè](https://github.com/francescodone)
- [Sara Feltrin](https://github.com/BluePerception)
- [Giacomo Greggio](https://github.com/giacomogreggio)
- [Samuele Giuliano Piazzetta](https://github.com/piaz97)
- [Paolo Pozzan](https://github.com/pozza96)
- [Matteo Santinon](https://github.com/MatteoSantinon)

