

import View from '../lib/view';
import MiniDoc from '../lib/minidoc/mini-doc';
import DivGroup from '../lib/minidoc/div-group';


export default View.extend({


  el: '#mini-doc',


  /**
   * Start the minidoc.
   */
  initialize: function() {

    this.doc = new MiniDoc('#text', this.el);

    // Render burials.
    let burials = new DivGroup('span.burial');
    this.doc.add(burials);

  },


});
