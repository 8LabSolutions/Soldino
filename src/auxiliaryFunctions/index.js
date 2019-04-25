import { store } from '../store/index';
import { BUSINESS, CITIZEN, GOVERN } from '../constants/actionTypes';

export function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return(today);
}

export function printDate(date) {
  var newDate = new Date(date)
  var dd = String(newDate.getDate()).padStart(2, '0');
  var mm = String(newDate.getMonth() + 1).padStart(2, '0');
  var yyyy = newDate.getFullYear();
  newDate = yyyy + '/' + mm + '/' + dd;
  return(newDate);
}

export function getVAT(cart) {
  let totalVAT = 0;
  cart.map (i => {totalVAT += (i.price*i.VAT)/(+100 + +i.VAT); return totalVAT})
  return(totalVAT);
}

export function getNet(cart) {
  let totalNet = 0;
  cart.map (i => {totalNet += i.price-((i.price*i.VAT)/(+100 + +i.VAT)); return totalNet})
  return(totalNet);
}

export function printShipment(address) {
  return(
    address[0]+" "+address[1]+", "+address[2]+", "+address[3]
  );
}

export function getName() {
  return(
    store.getState().user.name
  );
}

export function getDetails() {
  if(store.getState().user.userType === "CITIZEN"){
    return(
      store.getState().user.surname
    );
  }else{
    return(
      store.getState().user.VATNumber
    );
  }

}

export function getRegistrationAddress() {
  //get address used during registration from redux store
  return(
    [
      store.getState().user.streetName,
      store.getState().user.streetNumber,
      store.getState().user.district,
      store.getState().user.postCode
    ]
  )
}

Date.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
// eslint-disable-next-line
Date.prototype.isLeapYear = function () {
  return Date.isLeapYear(this.getFullYear());
}
// eslint-disable-next-line
Date.prototype.getDaysInMonth = function () {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}
// eslint-disable-next-line
Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
}

export function getQuarters() {
  //get first transaction (purchase or sell) made by business and based on its date
  //getQuarters should calculate the quarters
  //example:
  //  firstTransaction.date == 2018/08/28
  //  returned array == ['2018/08 - 2018/10', '2018/11 - 2019/01', '2019/02 - 2019/04']
  let quarterList = []
  let firstTransaction = new Date('2018/05/28') //ipfs get date ...
  let todayDate = new Date(getTodayDate())
  let iterateDatePrev = new Date(firstTransaction)
  let iterateDateNext = new Date(iterateDatePrev).addMonths(2)
  while(iterateDatePrev <= todayDate) {
    quarterList.push(iterateDatePrev.getFullYear()+'/'+String(+iterateDatePrev.getMonth()+1).padStart(2, '0')+' - '+iterateDateNext.getFullYear()+'/'+String(+iterateDateNext.getMonth()+1).padStart(2, '0'))
    iterateDatePrev = new Date(iterateDateNext).addMonths(1)
    iterateDateNext = new Date(iterateDatePrev).addMonths(2)
  }
  return quarterList.reverse()
}

export function getVATStatus(/*quarter*/) {
  //retreive data from ipfs
  let status = -321.23;
  return(status);
}

export function quarterToInvoices(quarter) {
  let startDate = new Date(quarter.substr(0, 7))
  //let endDate = new Date(quarter.substr(10,7))
  let invoicesList = []
  let name = "Product #1"
  let totalPrice = 10;
  let VAT = 22 //in %
  let netPrice = totalPrice-((VAT/100)*totalPrice);
  let description = "some description"
  let quantity = 2
  let product = [name, totalPrice, netPrice, VAT, description, quantity] //UC10 + net + VAT
  let product2 = [name, totalPrice, netPrice, VAT, description, quantity] //UC10 + net + VAT
  let invoice = {
    date: startDate,
    number: 12345,
    orderDate: startDate,
    orderNumber: 4164,
    products: [product],
    totalVAT: 2.2, //sum of all products' VAT
    totalCC: 10, //sum of all products' total
    sellerName: 'Tony S.P.A.',
    sellerVATNumber: '01384571004',
    buyerName: 'Enrico',
    buyerDetails: 'Verdi', //surname or VATNumber
    shipment: 'Via Antonio Grassi 13, Padova, 12345'
  }
  let invoice2 = {
    date: startDate,
    number: 67890,
    orderDate: startDate,
    orderNumber: 4164,
    products: [product, product2],
    totalVAT: 2.2, //sum of all products' VAT
    totalCC: 10, //sum of all products' total
    sellerName: 'Tony S.P.A.',
    sellerVATNumber: '01384571004',
    buyerName: 'Enrico',
    buyerDetails: 'Verdi', //surname or VATNumber
    shipment: 'Via Antonio Grassi 13, Padova, 12345'
  }
  //some data from ipfs with startDate <= invoices.date <= endDate
  invoicesList.push(invoice)
  invoicesList.push(invoice2)
  return(invoicesList);
}

export function ExportPDF(invoices, quarter) {
  console.log(invoices)
  console.log(quarter)
  //+invoices.map(i => {return(i.number)})+
  var returnRootComponent =
  "<h2>"+quarter+" resume</h2><br />"+
  "<h3>VAT status: "+getVATStatus(quarter)+" CC</h2><br/>"+
  "<p>_____________________________________________________________</p><br />"+
  invoices.map(i => {
    return(
      "<p>Invoice Number: "+i.number+"</p><br />"+
      "<p>Invoice Date: "+printDate(i.date)+"</p><br />"+
      "<p>Order Date: "+printDate(i.orderDate)+"</p><br />"+
      "<p>Order Number: "+i.orderNumber+"</p><br />"+
      i.products.map(j => {
        return(
          "<p>Product: "+j[0]+"</p><br />"+
          "<p>Total Price: CC "+j[1]+"</p><br />"+
          "<p>Net Price: CC "+j[2]+"</p><br />"+
          "<p>VAT %: "+j[3]+"</p><br />"+
          "<p>Description: "+j[4]+"</p><br />"+
          "<p>Quantity: "+j[5]+"</p><br />"
        )
      })+
      "<p>Total VAT: CC "+i.totalVAT+"</p><br />"+
      "<p>Total Price: CC "+i.totalCC+"</p><br />"+
      "<p>Seller: "+i.sellerName+" "+i.sellerVATNumber+"</p><br />"+
      "<p>Buyer: "+i.buyerName+" "+i.buyerDetails+"</p><br />"+
      "<p>Shipment: "+i.shipment+"</p><br />"+
      "<p>_____________________________________________________________</p><br />"
    )}
  )
  return(
    returnRootComponent
  )
}


export function checkBusiness() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === BUSINESS)
  }else return false;
}

export function checkCitizen() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === CITIZEN)
  }else return false;
}

export function checkGovernment() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === GOVERN)
  }else return false;
}

export function round(numberToRound) {
  return parseFloat(numberToRound).toFixed(2)
}

export function getBase64(file) {
  return new Promise((resolve)=>{
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.readAsDataURL(file[0]);
  })
  /*reader.onerror = function (error) {
    console.log('Error: ', error);
  };*/
}