[![Build Status](https://travis-ci.com/8LabSolutions/Soldino-PoC.svg?branch=final)](https://travis-ci.com/8LabSolutions/Soldino-PoC)
[![Coverage Status](https://coveralls.io/repos/github/8LabSolutions/Soldino-PoC/badge.svg?branch=final)](https://coveralls.io/github/8LabSolutions/Soldino-PoC?branch=final)
# Soldino
## 8Lab Solutions group
- [Federico Bicciato](https://github.com/nevepura)
- [Mattia Bolzonella](https://github.com/KamiShire)
- [Francesco Donè](https://github.com/francescodone)
- [Sara Feltrin](https://github.com/BluePerception)
- [Giacomo Greggio](https://github.com/giacomogreggio)
- [Samuele Giuliano Piazzetta](https://github.com/piaz97)
- [Paolo Pozzan](https://github.com/pozza96)
- [Matteo Santinon](https://github.com/MatteoSantinon)
## References

https://www.math.unipd.it/~tullio/IS-1/2018/Progetto/C6.pdf

Software Engineering project at University of Padua, developed for [Red Babel](http://redbabel.com/), by 8Lab Solutions.

## Getting started

In order to run Soldino you **must** have:

- `git`
- `truffle v5.0.5`  [ see references](https://www.truffleframework.com/docs/truffle/getting-started/installation)
- `nodejs v8.9.4` or later [see references](https://nodejs.org/en/)
- `metamask plugin` for `chrome v64 or later` or `firefox v71 or later`

Additional software:

- `Ganache GUI`  if you want an user interface for the local blockchain.

**Note** : *both* `Ganache GUI` *and* `ganache-cli` *(this is provided by default)*   **must**   *be set with port 9545 in order to run Soldino on the develop environment, this port can be set later.*

## Installation

### Ubuntu

1. download or clone (`git clone https://github.com/8LabSolutions/Soldino-PoC.git` ) this repository 
2. run `$ npm install` in the repository folder (`Soldino-PoC` folder)
   - If you have trouble with `$ npm install` run `$ sudo apt-get install build-essential` and retry run `npm install`
3. done!

### Windows

### Content of the repository

The project's folders are organized in this way:

```
├── contracts/ (all solidity contracts' file)
|      ├── logic/ (logic contracts)
|      └── storage/ (storage contracts)
├── migration
├── src/ (redux-react, web3 and ipfs folder)
|      ├── actions/
|      ├── actionCreators/
|      ├── auxiliaryFunctions/
|      ├── components/
|      |    ├── containers/
|      |    └── presentational/
|      ├── constants/
|      ├── contracts_build/
|      ├── facade/
|      ├── ipfsCalls/
|      ├── reducers/
|      ├── store/
|      ├── styles/
|      └── web3functions/
└── test/
```

The folders organization separates the back end ad front end. 

------

### Configure Soldino for the local envirorment

In the `truffle-config.js` you can set all the options for your environment. There are three default environments configured:

- `develop` : used as local environment it has the 9545 port set.

- `coverage`: used for the test coverage environment, port 8545. 

  To use this environment for run `$ npm coverage`, it will not open the web page. 

- `ropsten`: used to migrate contracts onto Ropsten test network.

#### Configure Ganache

In order to run Soldino DApp you have to open Ganache first. If you want to use `ganache-cli` open a new terminal and run `$ ganache-cli -p 9545` this will open a local blockchain on the port 9545. To see other configuration options please visit the [ganache-cli repository](https://github.com/trufflesuite/ganache-cli).

Otherwise, if you want to use Ganache GUI please follow these steps:

1. Open Ganache and click on "quickstart".
2. Click on the gear icon ![rotella](./images/rotella.png) in the top-left corner.
3. In the "SERVER" tab set 9545 in the "PORT NUMBER" field.
4. Click the "Save and restart" button in the top-left corner.

#### Run Soldino on the development environment

Run `$ npm start`. This command will deploy the contracts in `migrations/2_deploy_contracts.js`, Soldino will run on the `develop` environment.

Soldino will open in your default browser on address:

[localhost:3000]: localhost:3000/

Metamask will open at the same time. 

On Metamask tab, use option 

```
Import using account seed phrase
```

Copy and paste MNEMONIC phrase that you can find on Ganache GUI on top of homepage.

Otherwise, if you use ganache-cli you can find it in terminal where you run `$ ganache-cli -p 9545`.

Insert new password, confirm it and click "Restore".

When you are logged in on Metamask, click the link on top-right of the tab and select "Custom RPC".

In "New RPC URL" textbox insert 

[http://localhost:9545]: http://localhost:9545

and click "Save" button.

Now you can enjoy Soldino!!





