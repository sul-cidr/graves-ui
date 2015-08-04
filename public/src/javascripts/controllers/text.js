

import Controller from '../lib/controller';
import Text from '../views/text';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Text();
  },


});
