

import $ from 'jquery';
import d3 from 'd3';
import View from '../lib/view';
import styles from './line.yml';


export default View.extend({


  channels: ['map'],


  /**
   * Select the span, cache id / offset / width.
   *
   * @param {Object} options
   */
  initialize: function(options) {
    this.span   = $(options.event.target);
    this.id     = this.span.attr('data-id');
    this.offset = this.span.offset();
    this.height = this.span.outerHeight();
    this.width  = this.span.outerWidth();
  },


  /**
   * Inject line components.
   */
  show: function() {
    this.line = d3.select('#line').append('svg:line');
    this.update();
  },


  /**
   * Position the line.
   */
  update: function() {

    // Map offset.
    let [x2, y2] = this.channels.map.request(
      'burialOffset', this.id
    );

    // Text X.
    let x1 = x2 > this.offset.left ?
      this.offset.left + this.width + styles.padding :
      this.offset.left - styles.padding;

    // Text Y.
    let y1 = y2 > this.offset.top ?
      this.offset.top + this.height - styles.padding :
      this.offset.top + styles.padding;

    this.line.attr({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });

  },


  /**
   * Clear the line.
   */
  hide: function() {
    this.line.remove();
  },


});
