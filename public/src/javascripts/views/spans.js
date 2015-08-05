

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'onEnter',
    'mouseleave span.burial': 'onLeave',
    'click span.burial': 'onClick',
  },


  channels: ['spans', 'global'],


  // ** Publishers:


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onEnter: function(e) {

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
  onLeave: function(e) {
    let id = this.getIdFromEvent(e);
    this.channels.global.trigger('unhighlight', id);
  },


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick: function(e) {
    console.log(e);
  },


  // ** Renderers:


  /**
   * Highlight spans for a burial.
   *
   * @param {Number} id - Burial ID.
   */
  highlight: function(id) {
    this.getSpansWithId(id).addClass('highlighted');
  },


  /**
   * Unhighlight spans.
   *
   * @param {Number} id - Burial ID.
   */
  unhighlight: function(id) {
    this.getSpansWithId(id).removeClass('highlighted');
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
