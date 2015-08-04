

import Controller from '../lib/controller';
import Spans from '../views/spans';


export default Controller.extend({


  channel: 'spans',


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
   * Given a burial id, get the window-space offset of the span.
   *
   * @param {Number} id
   */
  getSpanOffset: function(id) {
    return this.view.getSpanOffset(id);
  },


});
