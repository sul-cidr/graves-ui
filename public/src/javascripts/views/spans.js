

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import View from '../lib/view';
import * as styles from './spans.yml';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter span.burial': 'publishHover',
    'mouseleave span.burial': 'publishBlur',
  },


  channels: ['spans'],


  /**
   * Notify when the cursor enters a span.
   *
   * @param {Object} e
   */
  publishHover: function(e) {
    this.channels.spans.trigger('hover', e);
  },


  /**
   * Notify when the cursor leaves a span.
   *
   * @param {Object} e
   */
  publishBlur: function(e) {
    this.channels.spans.trigger('blur');
  },


});
