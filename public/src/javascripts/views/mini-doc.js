

import View from '../lib/view';
import MiniDoc from '../lib/minidoc/mini-doc';
import DivGroup from '../lib/minidoc/div-group';
import Window from '../lib/minidoc/window';


export default View.extend({


  el: '#mini-doc',


  /**
   * Start the minidoc.
   */
  initialize: function() {

    this.doc = new MiniDoc('#text', this.el);

    // Render <p>'s.
    let sections = new DivGroup('.section', 'section');
    this.doc.add(sections);

    // Render burials.
    let burials = new DivGroup('span.burial', 'burial');
    this.doc.add(burials);

    // Add the scroll window.
    let scrollWindow = new Window();
    this.doc.add(scrollWindow);

  },


});
