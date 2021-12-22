var querystring = require('querystring');
var https = require('https');

var host = 'games.crossfit.com';
var sessionId = null;

var methods = {
  performRequest: function (endpoint, method, data, success) {
      var dataString = JSON.stringify(data);
      var headers = {};

      var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
      };

      var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
      });

      req.on('error', function(err) {
        console.log("ERROR!!!!!!");
        // console.dir(err);
      });

      req.write(dataString);
      req.end();
  }
};

module.exports = methods;