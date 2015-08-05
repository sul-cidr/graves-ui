

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'onSpanEnter',
    'mouseleave span.burial': 'onSpanLeave',
  },


  channels: ['spans', 'global'],


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

    // Emit the generic burial highlight.
    this.channels.global.trigger('highlight', id);

    // Emit the raw DOM event.
    this.channels.spans.trigger('enter', e);

  },


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onSpanLeave: function(e) {
    this.channels.global.trigger('unhighlight');
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
    this.spans.removeClass('highlight');
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
