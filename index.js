var request = require('request'),
    cheerio = require('cheerio');

module.exports = getData;
function getData(auth, cb) {
  var jar = request.jar();
  var url = 'https://manage.everydaygiftcards.com.au/login.aspx';
  request.post({
    url: url,
    formData: {
      txtCardNumber: auth.CardNumber || '',
      txtPIN: auth.PIN || ''
    },
    jar: jar,
    followRedirect: true
  }, processData);

  function processData(err, res, body) {
    if (err) return cb(err);
    $ = cheerio.load(body, { normalizeWhitespace: true });
    var errMsg = $('font[color="#ff0000"]').text().trim();

    if (errMsg) return cb(new Error(errMsg));

    request.get({
      url: 'https://manage.everydaygiftcards.com.au/Private/History.aspx',
      jar: jar
    }, function (err, res, body) {
      if (err) return cb(err);
      $ = cheerio.load(body, { normalizeWhitespace: true });

      var summary = {};
      var items = [];
      $('table table table table td.bg3').each(function (i, el) {
        var cell = $(el).text().trim();
        items.push(cell);
      });
      var fields = items.filter(Boolean);
      for (var i = 0; i < fields.length; i += 2) {
        summary[fields[i].replace(/\:$/, '')] = fields[i + 1];
      }

      var header = [];
      var rows = [];
      var csv = [];
      $('table#dgHistory tr').each(function (i, el) {
        var row = {};
        $('td', this).each(function (j, el) {
          var cell = $(el).text().trim();
          if (i === 0) {
            header.push(cell);
          } else {
            row[header[j]] = cell;
          }
        });
        if (i > 0) {
          rows.push(row);
        }
      });

      var ret = {
        summary: summary,
        transactions: rows
      };
      return cb(null, ret);
    });
  }
}

