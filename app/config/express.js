

import path from 'path';
import express from 'express';


export default (app) => {

  let root = path.normalize(`${__dirname}/../..`);
  let env = process.env.NODE_ENV || 'development';

  // Assign the port.
  app.set('port', process.env.PORT || 3000);

  // Set the static asset root.
  app.use(express.static(root+'/public'));

  // Set the template directory.
  app.set('views', root+'/app/views');
  app.set('view engine', 'jade');

  // Inject the livereload snippet.
  if (env == 'development') {
    app.use(require('connect-livereload')());
  }

};
