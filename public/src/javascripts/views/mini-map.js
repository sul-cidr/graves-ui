

import View from '../lib/view';


export default View.extend({


  el: '#mini-map',


  /**
   * Start the map.
   */
  initialize: function() {
    // TODO
  },


  // ** Features:


  /**
   * Plot provinces.
   *
   * @param {Object} data
   */
  ingestProvinces: function(data) {
    // TODO
    console.log(data);
  },


  /**
   * Plot burials.
   *
   * @param {Object} data
   */
  ingestBurials: function(data) {
    // TODO
    console.log(data);
  },


});
