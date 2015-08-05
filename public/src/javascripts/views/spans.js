

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'onEnter',
    'mouseleave span.burial': 'onLeave',
  },


  channels: ['spans'],


  /**
   * Notify when the cursor enters a span.
   *
   * @param {Object} e
   */
  onEnter: function(e) {
    this.channels.spans.trigger('enter', e);
  },


  /**
   * Notify when the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave: function(e) {
    this.channels.spans.trigger('leave');
  },


});
