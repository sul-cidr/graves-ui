

import Controller from '../lib/controller';
import Spans from '../views/spans';


export default Controller.extend({


  channel: 'spans',


  events: {
    global: {
      highlight: 'onHighlight',
      unhighlight: 'onUnhighlight',
    }
  },


  requests: {
    spanOffset: 'getSpanOffset',
  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Spans();
  },


  /**
   * Highlight spans for the highlighted burial.
   *
   * @param {Number} id
   */
  onHighlight: function(id) {
    this.view.highlight(id);
  },


  /**
   * Clear highlights.
   */
  onUnhighlight: function() {
    this.view.unhighlight();
  },


  /**
   * Get the window-space offset for a burial marker.
   *
   * @param {Number} id
   */
  getSpanOffset: function(id) {
    return this.view.getSpanOffset(id);
  },


});
