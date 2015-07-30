

import express from 'express';
import reload from 'connect-livereload';


let app = express();
let env = process.env.NODE_ENV || 'development';

// Assign the port.
app.set('port', process.env.PORT || 3000);

// Set view directory.
app.set('views', './app/views');
app.set('view engine', 'jade');

// Set asset root.
app.use(express.static('./public'));

// Inject the livereload snippet.
if (env == 'development') {
  app.use(reload());
}


app.get('/', (req, res) => {
  res.render('index');
});


export default app;
