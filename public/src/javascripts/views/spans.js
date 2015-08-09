

import _ from 'lodash';
import $ from 'jquery';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'onSpanEnter',
    'mouseleave span.burial': 'onSpanLeave',
    'click span.burial': 'onSpanClick',
  },


  channels: ['spans', 'burials'],


  /**
   * Select spans.
   */
  initialize: function() {
    this.spans = this.$('span.burial');
  },


  // ** Publishers:


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onSpanEnter: function(e) {
    let id = this.getIdFromEvent(e);
    this.channels.burials.trigger('highlight', id);
    this.channels.spans.trigger('enter', e);
  },


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onSpanLeave: function(e) {
    let id = this.getIdFromEvent(e);
    this.channels.burials.trigger('unhighlight', id);
  },


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onSpanClick: function(e) {
    let id = this.getIdFromEvent(e);
    this.channels.burials.trigger('select', id);
  },


  // ** Renderers:


  /**
   * Highlight spans for a burial.
   *
   * @param {Number} id
   */
  highlight: function(id) {
    this.getSpansWithId(id).addClass('highlight');
  },


  /**
   * Unhighlight spans.
   *
   * @param {Number} id
   */
  unhighlight: function(id) {
    this.getSpansWithId(id).removeClass('highlight');
  },


  // ** Helpers:


  /**
   * Highlight spans for a burial.
   *
   * @param {Number} id
   */
  getIdFromEvent: function(e) {
    return Number($(e.target).attr('data-id'));
  },


  /**
   * Highlight spans for a burial.
   *
   * @param {Number} id
   */
  getSpansWithId: function(id) {
    return this.$(`[data-id=${id}]`)
  },


});
