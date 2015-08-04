

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
    this.channels.global.trigger('highlight');
  },


  /**
   * Notify when the cursor leaves a span.
   *
   * @param {Object} e
   */
  publishUnhighlight: function(e) {
    this.channels.global.trigger('unhighlight');
  },


});
