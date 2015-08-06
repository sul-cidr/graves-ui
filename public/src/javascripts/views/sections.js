

import View from '../lib/view';


export default View.extend({


  el: '#text',


  /**
   * Select sections.
   */
  initialize: function() {
    this.sections = this.$('.section');
  },


});
