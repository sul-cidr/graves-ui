

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

    let offset = [
      this.$el.width()/2,
      this.$el.height()/2
    ];

    let projection = d3.geo.mercator()
      .center(d3.geo.centroid(this.data.china))
      .translate(offset);

    let path = d3.geo.path()
      .projection(projection);

    this.svg
    .append('path')
    .datum(this.data.china)
    .attr('d', path);

  },


});
