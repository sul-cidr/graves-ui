

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'publishHighlight',
    'mouseleave span.burial': 'publishUnhighlight',
  },


  channels: ['spans'],


  /**
   * Notify when the cursor enters a span.
   *
   * @param {Object} e
   */
  publishHighlight: function(e) {
    this.channels.spans.trigger('highlight', e);
  },


  /**
   * Notify when the cursor leaves a span.
   *
   * @param {Object} e
   */
  publishUnhighlight: function(e) {
    this.channels.spans.trigger('unhighlight');
  },


});
