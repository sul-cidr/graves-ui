

import _ from 'lodash';
import $ from 'jquery';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {

    // Spans:
    'mouseenter span.burial': 'onSpanEnter',
    'mouseleave span.burial': 'onSpanLeave',
    'click span.burial': 'onSpanClick',

    // Sections:
    'mouseenter .section': 'onSectionEnter',
    'mouseleave .section': 'onSectionLeave',

  },


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onSpanEnter: function(e) {
    // TODO
  },


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onSpanLeave: function(e) {
    // TODO
  },


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onSpanClick: function(e) {
    // TODO
  },


  /**
   * When the cursor enters a section.
   *
   * @param {Object} e
   */
  onSectionEnter: function(e) {
    // TODO
  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onSectionLeave: function(e) {
    // TODO
  },


});
