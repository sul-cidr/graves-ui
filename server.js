

import express from 'express';


let app = express();

// Assign the port.
app.set('port', process.env.PORT || 3000);


app.get('/ping', (req, res) => {
  res.send('pong');
});


export default app;
