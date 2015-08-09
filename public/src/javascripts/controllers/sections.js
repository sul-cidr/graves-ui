

import Controller from '../lib/controller';
import Sections from '../views/sections';


export default Controller.extend({


  events: {
    sections: {
      select: 'onSelect'
    }
  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Sections();
  },


  /**
   * Scroll to the selected section.
   *
   * @param {String} slug
   */
  onSelect: function(slug) {
    this.view.select(slug);
  },


});
