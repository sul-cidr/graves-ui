

import $ from 'jquery';
import d3 from 'd3';
import Backbone from 'backbone';
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

    this.span = $(e.target);
    this.id = this.span.attr('data-id');

    // The dot at the end.
    this.dot = this.svg.append('svg:circle').attr({ r: 5 });

    // The text -> map line.
    this.line = this.svg.append('svg:line');

    this.render();

  },


  /**
   * Position the line.
   */
  render: function() {

    // Span offset.
    let offset = this.span.offset();
    let x1 = offset.left + this.span.outerWidth() + styles.padding;
    let y1 = offset.top + styles.padding;

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
    if (this.line) this.line.interrupt();
    this.svg.selectAll('line, circle').remove();
  },


});
