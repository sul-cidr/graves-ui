

import $ from 'jquery';
import d3 from 'd3';
import View from '../lib/view';
import * as styles from './line.yml';


export default View.extend({


  el: '#line',


  channels: ['map'],


  /**
   * Inject the SVG container.
   */
  initialize: function() {
    this.svg = d3.select(this.el).append('svg:svg');
  },


  /**
   * Inject the line.
   *
   * @param {Object} e
   */
  show: function(e) {

    // Wrap the span.
    this.span = $(e.target);

    // Inject the <line>.
    this.line = this.svg.append('svg:line');

    // Inject the <circle>.
    this.dot = this.svg.append('svg:circle').attr({
      r: styles.radius
    });

    this.update();

  },


  /**
   * Position the line.
   */
  update: function() {

    if (!this.span) return;

    let w = this.span.outerWidth();
    let o = this.span.offset();

    // Span offset.
    let x1 = o.left + w + styles.padding;
    let y1 = o.top + styles.padding;

    // Map offset.
    let [x2, y2] = this.channels.map.request(
      'burialOffset',
      this.span.attr('data-id')
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
    this.svg.selectAll('*').remove();
    this.span = null;
  },


});
