

import d3 from 'd3';
import Backbone from 'backbone';
import View from '../lib/view';
import * as styles from './line.yml';


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

    // Animate the line length.
    this.line
    .transition()
    .duration(styles.transition.duration)
    .attr('x2', x2)
    .attr('y2', y2)
    .each('end', () => {
      this.svg.append('svg:circle').attr({
        cx: x2, cy: y2, r: 5
      });
    });

  },


  /**
   * Clear the line.
   */
  hide: function() {
    this.line.interrupt();
    this.svg.selectAll('line, circle').remove();
  },


});
