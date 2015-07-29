

import app from './server';
import debug from 'debug';


var log = debug('graves');


var server = app.listen(app.get('port'), function() {
  log(`'Listening on port ${server.address().port}`);
});
