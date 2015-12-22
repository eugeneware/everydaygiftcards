var expect = require('expect.js'),
    edgc = require('..');

describe('everydaygiftcards', function() {
  it('should be able to fetch the summary', function(done) {
    var auth = {
      CardNumber: '6280003090982277246',
      PIN: '1060'
    };

    edgc(auth, function (err, data) {
      console.log(data);
      if (err) return done(err);
      expect(data.summary).to.eql(
        { 'Card Number': '6280003090982277246',
          'Card Expiry': '23 Jun 2015',
          'Available Balance': '$0.00',
          'Total Purchases to Date': '$250.00',
          'Opening Balance': '$250.00',
          'Closing Balance': '$0.00' });
      done();
    });
  });

  it('should be able to fetch the transactions', function(done) {
    var auth = {
      CardNumber: '6280003090982277246',
      PIN: '1060'
    };

    edgc(auth, function (err, data) {
      if (err) return done(err);
      expect(data.transactions).to.eql(
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
            Balance: '$160.05' } ]);
      done();
    });
  });

  it('should be fail if there are bad login credentials', function(done) {
    var auth = {
      CardNumber: '000000',
      PIN: 'bad'
    };

    edgc(auth, function (err, data) {
      expect(err.message).to.equal(
        'You have failed to log in to the Card transaction summary page.' +
        'Please check your 19 digit Card and PIN Numbers and try again.');
      done();
    });
  });
});
