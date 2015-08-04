

import Controller from '../lib/controller';
import Spans from '../views/spans';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Spans();
  },


});
