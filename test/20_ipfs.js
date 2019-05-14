import ipfsModule from '../src/ipfsCalls/index';

contract("Test IPFS functions", function() {
  it("should test IPFS Product insertProduct and getProduct", function() {
    var productJSON = {
      title: "Palla",
      quantity: "4",
      price: 13.13,
      VAT: 0.70,
      sellerName: "8Lab Solutions s.p.a",
      sellerVATNumber: "1234567890"
    };
    return ipfsModule.insertJSONintoIPFS(productJSON).then((hash)=>{
      return ipfsModule.getJSONfromHash(hash).then((ris)=>{
        assert.equal(
          productJSON.title,
          ris.title,
          "avrebbero dovuto essere uguali"
        )
      })
    })
  })
})

