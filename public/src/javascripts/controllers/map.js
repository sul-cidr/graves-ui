

import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Map();
  },


});
