

import $ from 'jquery';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {
    'click .section': 'onClick',
  },


  /**
   * Select sections.
   */
  initialize: function() {
    this.sections = this.$('.section');
  },


  /**
   * When a section is clicked.
   *
   * @param {Object} e
   */
  onClick: function(e) {
    this.sections.removeClass('active');
    $(e.currentTarget).addClass('active');
  },


});
