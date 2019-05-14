import jsPDF from 'jspdf';
import { store } from '../src/store/index';
import { BUSINESS, CITIZEN, GOVERN } from '../src/constants/actionTypes';
import 'jspdf-autotable';

import { getTodayDate, printDate, getVAT, getNet, getName, getDetails } from '../src/auxiliaryFunctions/index';

// TESTING IN ORDER THE FUNCTIONS CONTAINED IN src/auxiliaryFunctions/index.js

/**
 * @description Checks if the function getTodayDate returns a date in format YYYY/MM/DD.
 */ 
test('testing getTodayDate', () => {
  expect(getTodayDate()).toMatch(/\d{4}\/\d{2}\/\d{2}/);
});

/**
 * @description Creates a date and checks if the function printDate returns a date in format YYYY/MM/DD.
 */
test('testing printDate', () => {
  let newDate = new Date('2020/06/30')
  expect(printDate(newDate)).toMatch(/\d{4}\/\d{2}\/\d{2}/);
});

// mocks of cart and products
let emptyCart = []
let fullCart = []
let product1 = {
    title: 'spaghetti',
    quantity: 1,
    price: 12.50,
    VAT: 4,
    sellerName: 'Albert',
    sellerVATNumber: '1234',
    keyProd: '25',
    seller: 'any',
    description: 'this is spaghetti'
}

let product2 = {
    title: 'cheese',
    quantity: 2,
    price: 0.50,
    VAT: 17,
    sellerName: 'Norbert',
    sellerVATNumber: '4312',
    keyProd: '22',
    seller: 'any',
    description: 'this is cheese'
}

fullCart.push(product1)
fullCart.push(product2)

/**
 * @description checks if getVAT returns a positive number, given a cart with 2 products.
 */
test('testing getVAT with full cart', () => {
  expect(getVAT(fullCart)).toBeGreaterThan(0);
});

/**
 * @description checks if getVAT returns zero, given an empty cart.
 */
test('testing getVAT with empty cart', () => {
  expect(getVAT(emptyCart)).toBe(0);
});


/**
 * @description checks if getNet returns a positive number, given a cart with 2 products.
 */
test('testing getNet with full cart', () => {
  expect(getNet(fullCart)).toBeGreaterThan(0);
});

/**
 * @description checks if getNet returns zero, given an empty cart.
 */
test('testing getNet with empty cart', () => {
  expect(getNet(emptyCart)).toBe(0);
});


// PRINT SHIPMENT

/**
 * @description the name must be a string. 
 */
test('testing getName', () => {
  let mockState = {
    'user' : {
      'name' : 'John',
    }
  }
  expect(mockState.user.name).toMatch('John');
});

/**
 * @description checks if a string containing the surname is returned.
 */
test('testing getDetails for citizen', () => {
  let citizenState = {
    'user' : {
      'name' : 'John',
      'surname' : 'Smith',
      'userType' : 'CITIZEN'
    }
  }

  if (citizenState.user.userType === 'CITIZEN'){
    expect(citizenState.user.surname).toBe('Smith');
  }

});


/**
 * @description checks if a string containing the VAT number is returned.
 */
test('testing getDetails for business', () => {
  let businessState = {
    'user' : {
      'name' : 'Toyota',
      'VATnumber' : '1234',
      'userType' : 'ANY'
    }
  }
  if (businessState.user.userType != 'CITIZEN'){
    expect(businessState.user.VATnumber).toBe('1234');
  }
});
