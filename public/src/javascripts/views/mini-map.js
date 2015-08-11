

import View from '../lib/view';


export default View.extend({


  el: '#mini-map',


  /**
   * Start the map.
   *
   * @param {Object} data
   */
  initialize: function(data) {
    this.data = data;
    this._initChina();
  },


  // ** Features:


  /**
   * Plot the Chinese borders.
   */
  _initChina: function() {
    console.log(this.data.china);
  },


});
