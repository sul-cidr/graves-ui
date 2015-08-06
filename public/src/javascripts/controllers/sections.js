

import Controller from '../lib/controller';
import Sections from '../views/sections';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Sections();
  },


});
