export function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return(today);
}

export function getVAT(cart) {
  let totalVAT = 0;
  {cart.map (i => {
    totalVAT += i.price*(i.VAT/100)
  })}
  return(totalVAT);
}

export function getNet(cart) {
  let totalNet = 0;
  {cart.map (i => {
    totalNet += i.price*(1-(i.VAT/100))
  })}
  return(totalNet);
}

export function printShipment(address) {
  return(
    address[0]+" "+address[1]+", "+address[2]+", "+address[3]
  );
}