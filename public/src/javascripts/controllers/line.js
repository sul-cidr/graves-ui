

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
    },

    map: {
      move: 'onMove'
    },

  },


  channels: ['map'],


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Line();
  },


  /**
   * Add a text -> map line.
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


  /**
   * Reposition the line.
   */
  onMove: function() {
    this.view.render();
  },


});
