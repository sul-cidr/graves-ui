

var app = require('./server');
var debug = require('debug')('graves');

var server = app.listen(3000, function() {
  debug('Listening on port ' + server.address().port);
});
