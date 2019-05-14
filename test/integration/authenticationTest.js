const authentication = require("../../src/facade/authentication.js")
var jsdom = require('mocha-jsdom')
jsdom()
contract("Authorization", () => {
  jsdom()
  it("Should check the registration", () => {
    const type = 'CITIZEN';
    const email = 'mario.rossi@soldino.com';
    const streetName = 'Via Verdi'
    const streetNumber = '20'
    const district = 'Padova'
    const postCode = '23143'
    const name = 'Mario'
    const details = 'Rossi'
    return authentication.default.addUser(
      type,
      email,
      streetName,
      streetNumber,
      district,
      postCode,
      name,
      details
    )
    .then(()=>{
      //registration ok
      assert.equal(true, true)
    })
    .catch(()=>{
      assert.equal(true, false)
    })
  })
})
