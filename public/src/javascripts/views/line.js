

import $ from 'jquery';
import d3 from 'd3';
import View from '../lib/view';
import * as styles from './line.yml';


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
    this.width  = this.span.outerWidth();
  },


  /**
   * Inject line components.
   */
  show: function() {

    // Top-level <g>.
    this.group = d3.select('svg#line').append('svg:g');

    // Text -> map <line>.
    this.line = this.group.append('svg:line');

    // <circle> on map marker.
    this.dot = this.group.append('svg:circle').attr({
      r: styles.radius
    });

    this.update();

  },


  /**
   * Position the line.
   */
  update: function() {

    // Span offset.
    let x1 = this.offset.left + this.width + styles.padding;
    let y1 = this.offset.top + styles.padding;

    // Map offset.
    let [x2, y2] = this.channels.map.request(
      'burialOffset', this.id
    );

    this.line.attr({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2
    });

    this.dot.attr({
      cx: x2,
      cy: y2
    });

  },


  /**
   * Clear the line.
   */
  hide: function() {
    this.group.remove();
  },


});
