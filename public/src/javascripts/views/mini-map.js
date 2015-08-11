

import d3 from 'd3';
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
    this.svg = d3.select(this.el);

    this._initChina();

  },


  // ** Features:


  /**
   * Plot the Chinese borders.
   */
  _initChina: function() {
    // TODO
  },


});
