

import app from './server';
import debug from 'debug';


var log = debug('graves');


// Start the server.
app.listen(app.get('port'), function() {
  log(`Listening on port ${app.get('port')}`);
});
