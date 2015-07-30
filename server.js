

import express from 'express';
import configExpress from './app/config/express'
import config from 'config';
import pg from 'pg';
import Promise from 'bluebird';
import preql from 'preql';


// Init server.
let app = express();
configExpress(app);


// Load SQL queries.
let queries = preql.makeQueries('./app/queries');


// Promise-ify PG.
let db = Promise.promisifyAll(pg);


app.get('/', (req, res) => {
  res.render('index');
});


app.get('/api/towns', (req, res) => {

  db
  .connectAsync(config.postgres)
  .spread((client, close) => {

    queries.getTowns(client.query.bind(client), (err, r) => {
      res.send(r.rows);
    });

  });

});


export default app;
