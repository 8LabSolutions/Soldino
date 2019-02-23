pragma solidity ^0.5.0;

contract Adoption {

    address[16] public adopters;  //array di indirizzi Ethereum
    //esite un unico tipo in solidity: address. Ogni smart contract o account sulla blockchain Ethereum ha un address con cui invia riceve Ether

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {  
        //tipi dei parametri e di ritorno sono da specificare
        require(petId >= 0 && petId <= 15,"Errore nell'ID"); 
        //verificare che una proprietà sia vera: uso di require

        adopters[petId] = msg.sender; 
        //aggiungere l'indirizzo della persona o smart contract che ha effettuato la chiamata della funzione al nostro array

        return petId; //restituzione dell'ID fornito come conferma
    }

    // Retrieving the adopters: ritorna l'intero array
    function getAdopters() public view returns (address[16] memory) { 
        //se l'array è già dichiarato, lo ritorno. tipo di ritorno(indicato tra parentesi: memory fornisce la locazione dei dati per la variabile)
        return adopters;
    }
    //view: indica che la funzione non modificherà lo stato del contract


}