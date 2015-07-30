

import express from 'express';
import configExpress from './app/config/express'


let app = express();
configExpress(app);


app.get('/', (req, res) => {
  res.render('index');
});


app.get('/api/towns', (req, res) => {
  res.send('towns');
});


export default app;
