# everydaygiftcards

Fetch info about your Woolworths Every Day Gift Card balance and transaction history

[![build status](https://secure.travis-ci.org/eugeneware/everydaygiftcards.png)](http://travis-ci.org/eugeneware/everydaygiftcards)

## Installation

This module is installed via npm:

``` bash
$ npm install everydaygiftcards
```

## Example Usage

``` js
var edgc = require('everydaygiftcards');
var auth = {
  CardNumber: '1234123412341234', // Card Number
  PIN: '1234' // Card Pin
};
edgc(auth, function (err, data) {
  if (err) throw err;
  console.log(data);
  /*
    { summary:
       { 'Card Number': '1234123412341234',
         'Card Expiry': '11 Aug 2014',
         'Available Balance': '$0.00',
         'Total Purchases to Date': '$250.00',
         'Opening Balance': '$250.00',
         'Closing Balance': '$0.00' },
      transactions:
       [ { Date: '26.08.2014',
           Location: 'Safeway, Ferntree Gully',
           Type: 'Purchase',
           Amount: '$3.94',
           Balance: '$0.00' },
         { Date: '18.08.2014',
           Location: 'Safeway, Wheelers Hill',
           Type: 'Purchase',
           Amount: '$16.05',
           Balance: '$3.94' },
         { Date: '16.08.2014',
           Location: 'Safeway, Wheelers Hill',
           Type: 'Purchase',
           Amount: '$140.06',
           Balance: '$19.99' },
         { Date: '26.07.2014',
           Location: 'Safeway, Wheelers Hill',
           Type: 'Purchase',
           Amount: '$89.95',
           Balance: '$160.05' } ] }
  */
});
```
