

import View from '../lib/view';
import MiniDoc from '../lib/minidoc/minidoc';


export default View.extend({


  el: '#mini-doc',


  /**
   * Start the minidoc.
   */
  initialize: function() {
    this.doc = new MiniDoc('#text', this.el);
  },


});
