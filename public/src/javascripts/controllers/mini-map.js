

import Radio from 'backbone.radio';
import Controller from '../lib/controller';
import MiniMap from '../views/mini-map';
import china from '../data/CHN.geo.json';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {

    let data = Radio.channel('data');

    // Wait for the burials to load.
    let getBurials = new Promise((resolve, reject) => {
      data.once('burials', resolve);
    });

    getBurials.then(burials => {

      // Start the view.
      this.view = new MiniMap({
        china: china,
        burials: burials
      });

      this.listen();

    });

  },


});
