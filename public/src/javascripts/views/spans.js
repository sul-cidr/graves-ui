

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


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onEnter: function(e) {
    this.channels.spans.trigger('enter', e);
  },


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onLeave: function(e) {
    this.channels.spans.trigger('leave');
  },


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onClick: function(e) {
    console.log(e);
  },


});
