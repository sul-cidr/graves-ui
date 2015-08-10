

import Controller from '../lib/controller';
import MiniMap from '../views/mini-map';


export default Controller.extend({


  events: {
    data: {
      burials: 'ingestBurials',
    }
  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new MiniMap();
    this.listen();
  },


  /**
   * Load burial sites.
   *
   * @param {Object} burials
   */
  ingestBurials: function(burials) {
    this.view.ingestBurials(burials);
  },


});
