

import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'publishHighlight',
    'mouseleave span.burial': 'publishUnhighlight',
  },


  channels: ['global'],


  /**
   * Start the map.
   */
  initialize: function() {
    // TODO
  },


  /**
   * Notify when the cursor enters a span.
   *
   * @param {Object} e
   */
  publishHighlight: function(e) {
    let id = $(e.target).attr('data-id');
    this.channels.global.trigger('highlight', Number(id));
  },


  /**
   * Notify when the cursor leaves a span.
   *
   * @param {Object} e
   */
  publishUnhighlight: function(e) {
    let id = $(e.target).attr('data-id');
    this.channels.global.trigger('unhighlight', Number(id));
  },


  /**
   * Get the window-space offset of a span.
   *
   * @param {Number} id
   */
  getSpanOffset: function(id) {

    let span = $(`[data-id=${id}]`);
    let offset = span.offset();

    let x = offset.left + span.outerWidth() + 5;
    let y = offset.top + 5;

    return [x, y];

  },


});