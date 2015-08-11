

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
    this._initMarkup();

  },


  /**
   * Plot the Chinese borders.
   */
  _initChina: function() {

    let offset = [
      this.$el.width()/2,
      this.$el.height()/2
    ];

    this.projection = d3.geo.mercator()
      .center(d3.geo.centroid(this.data.china))
      .translate(offset);

    let path = d3.geo.path()
      .projection(this.projection);

    this.svg
      .append('path')
      .datum(this.data.china)
      .attr('d', path);

  },


  /**
   * Inject the UI elements.
   */
  _initMarkup: function() {

    // Extent <rect>.
    this.extent = this.svg.append('rect')
      .classed({ extent: true });

  },


  /**
   * Position the extent box.
   *
   * @param {Object} extent
   */
  setExtent: function(extent) {

    let c1 = this.projection([
      extent.c1.lng,
      extent.c1.lat,
    ]);

    let c2 = this.projection([
      extent.c2.lng,
      extent.c2.lat,
    ]);

    this.extent.attr({
      x:      c1[0],
      y:      c1[1],
      height: c2[1]-c1[1],
      width:  c2[0]-c1[0],
    });

  },


});
