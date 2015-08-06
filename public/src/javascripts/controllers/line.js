

import $ from 'jquery';
import Controller from '../lib/controller';
import Line from '../views/line';
import * as styles from './line.yml'


export default Controller.extend({


  events: {
    spans: {
      enter: 'onShow'
    },
    global: {
      unhighlight: 'onHide'
    }
  },


  channels: ['map'],


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Line();
  },


  /**
   * Render a line between the text and the map.
   *
   * @param {Object} e
   */
  onShow: function(e) {
    this.view.show(e);
  },


  /**
   * Clear the line.
   */
  onHide: function() {
    this.view.hide();
  },


});
