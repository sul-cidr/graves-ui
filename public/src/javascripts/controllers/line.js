

import Controller from '../lib/controller';
import Line from '../views/line';


export default Controller.extend({


  events: {

    text: {
      hover: 'onShow'
    },

    burials: {
      unhighlight: 'onHide'
    },

    map: {
      move: 'onMove'
    },

  },


  /**
   * By default, no line.
   */
  initialize: function() {
    this.view = null;
  },


  /**
   * Add a text -> map line.
   *
   * @param {Object} e
   */
  onShow: function(e) {
    this.view = new Line({ event: e });
    this.view.show();
  },


  /**
   * Update the position.
   */
  onMove: function() {
    if (this.view) {
      this.view.update();
    }
  },


  /**
   * Clear the line.
   */
  onHide: function() {
    if (this.view) {
      this.view.hide();
      this.view = null;
    }
  },


});
