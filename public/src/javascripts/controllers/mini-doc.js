

import $ from 'jquery';
import Controller from '../lib/controller';
import MiniDoc from '../views/mini-doc';


export default Controller.extend({


  channel: 'mini-doc',


  /**
   * Start the view.
   */
  initialize: function() {
    $(window).load(() => {
      this.view = new MiniDoc();
      this.start();
    });
  },


});
