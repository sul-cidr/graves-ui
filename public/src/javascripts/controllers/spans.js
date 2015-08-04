

import Controller from '../lib/controller';
import Spans from '../views/spans';


export default Controller.extend({


  channel: 'spans',


  requests: {
    spanOffset: 'spanOffset',
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
  spanOffset: function(id) {
    return this.view.getSpanOffset(id);
  },


});
