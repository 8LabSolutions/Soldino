import jsPDF from 'jspdf';
import { store } from '../store/index';
import { BUSINESS, CITIZEN, GOVERN } from '../constants/actionTypes';
import 'jspdf-autotable';

/**
 * @description Get today date with the format YYYY/MM/DD.
 * @returns The function returns the today date.
 */
export function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;
  return(today);
}

/**
 * @description Print a date with the format YYYY/MM/DD.
 * @returns The function returns the date with a new format.
 * @param {*} date
 */
export function printDate(date) {
  var newDate = new Date(date)
  var dd = String(newDate.getDate()).padStart(2, '0');
  var mm = String(newDate.getMonth() + 1).padStart(2, '0');
  var yyyy = newDate.getFullYear();
  newDate = yyyy + '/' + mm + '/' + dd;
  return(newDate);
}

/**
 * @description Get total VAT of a collection of orders called cart.
 * @returns The function returns the total VAT.
 * @param {*} cart
 */
export function getVAT(cart) {
  let totalVAT = 0;
  cart.map (i => {totalVAT += ((i.price*i.VAT)/(+100 + +i.VAT)*i.quantity); return totalVAT})
  return(totalVAT);
}

/**
 * @description Get total net of a collection of orders called cart.
 * @returns The function returns the total net.
 * @param {*} cart
 */
export function getNet(cart) {
  let totalNet = 0;
  cart.map (i => {totalNet += (i.price-((i.price*i.VAT)/(+100 + +i.VAT)))*i.quantity; return totalNet})
  return(totalNet);
}

/**
 * @description Print an address with the format "StreetName StreetNumber, City, PostCode".
 * @returns The function returns a string with the input address with a new format.
 * @param {*} address
 */
export function printShipment(address) {
  return(
    address[0]+" "+address[1]+", "+address[2]+", "+address[3]
  );
}

/**
 * @description Get the name of the logged user.
 * @returns The function returns a string with the logged user name.
 */
export function getName() {
  return(
    store.getState().user.name
  );
}

/**
 * @description Get the details of the logged user.
 * @returns The function returns a string with the logged user surname in case of Citize, otherwise returns the VAT number.
 */
export function getDetails() {
  if(store.getState().user.userType === "CITIZEN"){
    return(
      store.getState().user.surname
    );
  }else{
    return(
      store.getState().user.VATnumber
    );
  }

}

/**
 * @description Get the address of the logged user inserted during signing up.
 * @returns The function returns a string with an array containing the address of the logged user, with the format [StreetName, StreetNumber, City, PostCode].
 */
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

/**
 * @description Check if the year is lep.
 * @returns The function returns a boolean value.
 * @param {*} year
 */
Date.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

/**
 * @description Get days in month.
 * @returns The function returns an integer value.
 * @param {*} year
 * @param {*} month
 */
Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/**
 * @description Check if the year is lep.
 * @returns The function returns a boolean value.
 * @param {*} year
 */
Date.prototype.isLeapYear = function () {
  return Date.isLeapYear(this.getFullYear());
}

/**
 * @description Get days in month.
 * @returns The function returns an integer value.
 */
Date.prototype.getDaysInMonth = function () {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}

/**
 * @description Add few months to a date.
 * @returns The function returns the new date.
 * @param {*} value of months to add
 */
Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
}

/**
 * @description Export a quarter and it's invoices for PDF download functionality.
 * @returns The formatted version of invoices and the related quarter.
 * @param {*} invoices
 * @param {*} quarter
 */
export function ExportPDF(invoices, quarter) {
  console.log(invoices)
  console.log(quarter)
  var doc = new jsPDF()
  var high = 100
  doc.text(20, 20, periodToDate(quarter.id) + ' resume');
  doc.setLineWidth(0.5);
  doc.line(20, 25, 100, 25);
  doc.text(20, 40, 'VAT status: '+ round(-1*quarter.amount)+ ' CC');
  doc.setLineWidth(0.5);
  doc.line(20, 45, 100, 45);
  invoices.map(i => {
    return(
      doc.autoTable({
        margin: {left: 20},
        startY: 70,
        columnStyles: {0:{ halign: 'center'},1:{ halign: 'center'},2:{ halign: 'center'},3:{ halign: 'center'},7:{ halign: 'center'}},
        headStyles: {cellWidth: 20, halign: 'center', fillColor: [20,29,37]},
        bodyStyles: {cellWidth: 20},
        head: [['Invoice Number', 'Invoice Date', 'Order Date','Total VAT','Seller','Buyer']],
        body: [
            [i.number,printDate(i.date),
              printDate(i.date),
              round((i.VAT/100)*i.net).toFixed(2)+' CC',
              i.sellerName+" "+i.sellerVATNumber,
              i.buyerName
            ]
          ]
      }),
      doc.setFontSize(9),
      doc.text(20, 55, 'Seller\'s wallet address: '+i.sellerAddress),
      doc.text(20, 60, 'Buyer\'s wallet address: '+i.buyerAddress),
      doc.autoTable({
        columnStyles: {1:{ halign: 'center'},2:{ halign: 'center'},3:{ halign: 'center'},4:{ halign: 'center'},5:{ halign: 'center'}},
        headStyles: {cellWidth: 20, halign: 'center', fillColor: [0,128,0]},
        bodyStyles: {cellWidth: 20, valign: 'middle'},
        margin: {left: 20},
        startY: high,
        head: [['Product', 'Net price per unit','VAT %','Quantity','Total Price','Total VAT']],
        body:
          i.products.map(j => {return(
            [j.title,
              round(((j.price*100)/(+j.VAT + +100))).toFixed(2),
              j.VAT,
              j.quantity,
              round(j.price*j.quantity).toFixed(2),
              round(round(j.price*j.quantity)-round(((j.price*100)/(+j.VAT + +100))*j.quantity)).toFixed(2)
            ]
          )})
      }),
      doc.addPage())
  })
  return(
    doc
  )
}

/**
 * @description Check if the logged user is a business user.
 * @returns a boolean value.
 */
export function checkBusiness() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === BUSINESS)
  }else return false;
}

/**
 * @description Check if the logged user is a citizen user.
 * @returns a boolean value.
 */
export function checkCitizen() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === CITIZEN)
  }else return false;
}

/**
 * @description Check if the logged user is the government user.
 * @returns a boolean value.
 */
export function checkGovernment() {
  if(store.getState().user !== null){
    return (store.getState().logged === true && store.getState().user.userType === GOVERN)
  }else return false;
}

/**
 * @description Round a number up to two decimal values.
 * @returns a float number.
 * @param {*} numberToRound
 */
export function round(numberToRound) {
  return parseFloat(parseFloat(numberToRound).toFixed(2))
}

/**
 * @description Get a cast to base64 of a file.
 * @returns a base64 value.
 * @param {*} file
 */
export function getBase64(file) {
  return new Promise((resolve)=>{
    var reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result)
    };
    reader.readAsDataURL(file[0]);
  })
}

/**
 * @description Convert a period to a date.
 * @returns A date with the format "XXX-ZZZ YYYY" where XXX-ZZZ is a quarter for example Jan-Mar.
 * @param {*} period
 */
export function periodToDate(period) {
  let month = null;
  let year = parseInt(period.substring(0, 4));
  switch (parseInt(period.substring(5,6))){
    case 1:
      month = "Jan-Mar"
    break;
    case 2:
      month = "Apr-Jun"
    break;
    case 3:
      month = "Jul-Sep"
    break;
    case 4:
      month = "Oct-Dec"
    break;
  }
  return month+" "+year;
}

/**
 * @description Convert a date to a period.
 * @returns A period with the YYYY-I where I is a quarter for example 1 (= first quarter)
 * @param {*} period
 */
export function dateToPeriod(date) {
  let month = null;
  let year = date.substring(8, 12);
  switch (date.substring(0, 7)){
    case "Jan-Mar":
      month = 1
    break;
    case "Apr-Jun":
      month = 2
    break;
    case "Jul-Sep":
      month = 3
    break;
    case "Oct-Dec":
      month = 4
    break;
  }
  return year+"-"+month;
}
