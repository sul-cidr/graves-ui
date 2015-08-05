

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
   * @param {Number} id - Burial ID.
   */
  onHighlight: function(id) {
    this.view.highlight(id);
  },


  /**
   * Remove highlights.
   *
   * @param {Number} id - Burial ID.
   */
  onUnhighlight: function(id) {
    this.view.unhighlight(id);
  },


  /**
   * Get the window-space offset for a burial marker.
   *
   * @param {Number} id - Burial ID.
   */
  getSpanOffset: function(id) {
    return this.view.getSpanOffset(id);
  },


});
