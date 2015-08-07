

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
    this.active = false;
  },


  /**
   * Inject the line.
   *
   * @param {Object} e
   */
  show: function(e) {

    // Cache DOM touches.
    this.span   = $(e.target);
    this.id     = this.span.attr('data-id');
    this.offset = this.span.offset();
    this.width  = this.span.outerWidth();

    // Inject the <line>.
    this.line = this.svg.append('svg:line');

    // Inject the <circle>.
    this.dot = this.svg.append('svg:circle').attr({
      r: styles.radius
    });

    this.active = true;
    this.update();

  },


  /**
   * Position the line.
   */
  update: function() {

    if (!this.active) return;

    // Span offset.
    let x1 = this.offset.left + this.width + styles.padding;
    let y1 = this.offset.top + styles.padding;

    // Map offset.
    let [x2, y2] = this.channels.map.request('burialOffset', this.id);

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
    this.active = false;
  },


});
