

import d3 from 'd3';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#line',


  /**
   * Inject the SVG container.
   */
  initialize: function() {
    this.svg = d3.select(this.el).append('svg:svg');
  },


  /**
   * Render the line.
   *
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   */
  show: function(x1, y1, x2, y2) {

    // Inject the <line>.
    this.line = this.svg.append('svg:line').attr({
      x1: x1, y1: y1, x2: x1, y2: y1
    });

    this.line
    .transition()
    .attr('x2', x2)
    .attr('y2', y2);

  },


  /**
   * Clear the line.
   */
  hide: function() {
    this.line.remove();
  },


});
