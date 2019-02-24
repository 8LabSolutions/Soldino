pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol"; //questo smart contract fornisce l'indirizzo del contract di cui ho fatto il deploy(Adoption)
import "../contracts/Adoption.sol";

contract TestAdoption {
 // The address of the adoption contract to be tested
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

 // Testing the adopt() function
    function testUserCanAdoptPet() public {
        uint returnedId = adoption.adopt(expectedPetId);

        Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
    }

    // Testing retrieval of a single pet's owner
    function testGetAdopterAddressByPetId() public {
        address adopter = adoption.adopters(expectedPetId);
        //dato che le var pubbliche hanno un metodo get "automatico" in questo caso dall'address adoption recupero l'array e da esso recupero
        //il proprietario(uno solo) che ha adottato l'animale e lo verifico con assert

        Assert.equal(adopter, expectedAdopter, "Owner of the expected pet should be this contract");
    }

    // Testing retrieval of all pet owners: test per il metodo get ridefinito per ritornarmi tutto l'array di proprietari
    function testGetAdopterAddressByPetIdInArray() public {
      // Store adopters in memory rather than contract's storage
        address[16] memory adopters = adoption.getAdopters();
        //"memory": per memorizzare temporaneamente il valore in memoria pittosto che salvarlo nella "memoria del contratto"

        Assert.equal(adopters[expectedPetId], expectedAdopter, "Owner of the expected pet should be this contract");
    }

    // The id of the pet that will be used for testing
    uint expectedPetId = 8;

    //The expected owner of adopted pet is this contract
    address expectedAdopter = address(this); //setto l'address dell'adottante a this(per ottenere l'indirizzo del contratto corrente)

}