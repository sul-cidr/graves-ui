

import * as api from '../controllers/api';


export default (app) => {
  app.get('/towns', api.towns);
};
