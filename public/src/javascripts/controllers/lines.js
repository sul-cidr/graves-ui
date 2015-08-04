

import Controller from '../lib/controller';


export default Controller.extend({


  events: {
    global: {
      highlight: 'highlight'
    }
  },


  channels: ['global'],


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
    // TODO
  },


});
