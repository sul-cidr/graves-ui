

import Controller from '../lib/controller';


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
    // TODO
  },


  /**
   * Render a line between the text and the map.
   *
   * @param {Number} id
   */
  onHighlight: function(id) {

    // Get window-space offsets for the span and marker.
    let tOffset = this.channels.spans.request('spanOffset', id);
    let mOffset = this.channels.map.request('burialOffset', id);

    console.log(tOffset, mOffset);

  },


});
