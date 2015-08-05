

import Controller from '../lib/controller';
import Line from '../views/line';


export default Controller.extend({


  events: {
    global: {
      highlight: 'onHighlight'
    }
  },


  channels: ['map', 'spans'],


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Line();
  },


  /**
   * Render a line between the text and the map.
   *
   * @param {Number} id
   */
  onHighlight: function(id) {

    // Get offsets for the span and marker.
    let [x1, y1] = this.channels.spans.request('spanOffset', id);
    let [x2, y2] = this.channels.map.request('burialOffset', id);

    // Render the line.
    this.view.show(x1, y1, x2, y2);

  },


});
