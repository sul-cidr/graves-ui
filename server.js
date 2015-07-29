

import express from 'express';
import configExpress from './app/config/express';
import configRoutes from './app/config/routes';


var app = express();

// Apply config.
configExpress(app);
configRoutes(app);


export default app;
