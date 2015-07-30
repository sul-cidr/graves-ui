

import express from 'express';


let app = express();

// Assign the port.
app.set('port', process.env.PORT || 3000);

// Set view directory.
app.set('views', './app/views');
app.set('view engine', 'jade');

// Set asset root.
app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.render('index');
});


export default app;
