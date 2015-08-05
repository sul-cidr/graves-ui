

import $ from 'jquery';
import Controller from '../lib/controller';
import Line from '../views/line';


export default Controller.extend({


  events: {
    spans: {
      hover: 'onHover',
      blur: 'onBlur',
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
  onHover: function(e) {

    let span = $(e.target);

    // Use top left corner as the anchor.
    let offset = span.offset();
    let x1 = offset.left + span.outerWidth() + 5;
    let y1 = offset.top + 5;

    // Get map offset.
    let id = Number(span.attr('data-id'));
    let [x2, y2] = this.channels.map.request('burialOffset', id);

    // Render the line.
    this.view.show(x1, y1, x2, y2);

  },


  /**
   * Clear the line.
   */
  onBlur: function() {
    this.view.hide();
  },


});