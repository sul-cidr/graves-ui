

import Controller from '../lib/controller';


export default Controller.extend({


  events: {
    global: {
      highlight: 'highlight'
    }
  },


  channels: ['map', 'spans'],


  /**
   * Start the view.
   */
  initialize: function() {
    // TODO
  },


  /**
   * Render a line between the text and the map.
   *
   * @param {Number} id
   */
  highlight: function(id) {

    // Get window-space offsets for the span and marker.
    let tOffset = this.channels.spans.request('spanOffset', id);
    let mOffset = this.channels.map.request('markerOffset', id);

    console.log(tOffset);

  },


});
