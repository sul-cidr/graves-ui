

import express from 'express';
import configExpress from './app/config/express';
import configRoutes from './app/config/routes';


var app = express();

// Set config.
configExpress(app);
configRoutes(app);


export default app;