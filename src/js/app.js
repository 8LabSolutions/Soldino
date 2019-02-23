App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {

    //aggiunta
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
      // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    //fine aggiunta

    return App.initContract();
  },

  //Istanziazione di web3: funzione precedente legata alla configurazione con i moderni browser e con l'ultima versione di Metamask 
  //e alternative in caso di situazione diversa(versioni vecchie di Metamask ecc.) e creazione di un'istanza di web3


  //Ora possiamo interagire con Ethereum tramite web3, dobbiamo istanziare i nostri smart contract quindi web3 sa dove trovarlo e come funziona. 
  //si usa una libreria di Truffle(Truffle-contract): mantiene le informazioni sul contract in sincrono con le migration.

  initContract: function() {

    //aggiunta
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      //This creates an instance of the contract we can interact with.
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    //fine aggiunta

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },
  //aggiunta
  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call(); //call:allows us to read data from the blockchain without having to send a full transaction, meaning we won't have to spend any ether
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        //array contiene address type, quindi Ethereum inizializza l'array con 16 address vuoti(questo sotto è il controllo che l'address cercato non sia vuoto)
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);  
          //cambia l'interfaccia dal bottone "Adozione" al text "Success" perchè è stata trovata una corrispondenza sull'address relativo al petID cercato(aka ho già adottato questo pet)
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
    //fine aggiunta
  },


  //qui sotto uso web3 per ottenere lo user account

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    //aggiunta
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      //seleziono il primo account
      var account = accounts[0];

      //questa volta invece che call verrà inviata una transazione
      //we get the deployed contract as we did above and store the instance in adoptionInstance
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account: richiede un "from" address e ha un costo associato(gas: tassa in ether per effettuare la transazione)
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });

    //fine aggiunta
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
