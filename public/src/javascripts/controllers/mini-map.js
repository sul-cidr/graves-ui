

import Controller from '../lib/controller';
import MiniMap from '../views/mini-map';


export default Controller.extend({


  events: {
    data: {
      provinces: 'ingestProvinces',
      burials: 'ingestBurials',
    }
  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new MiniMap();
  },


  /**
   * Ingest provinces.
   *
   * @param {Object} provinces
   */
  ingestProvinces: function(provinces) {
    this.view.ingestProvinces(provinces);
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
