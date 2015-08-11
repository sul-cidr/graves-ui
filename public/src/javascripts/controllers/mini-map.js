

import Radio from 'backbone.radio';
import Controller from '../lib/controller';
import MiniMap from '../views/mini-map';
import china from '../data/CHN.geo.json';
import {waitOnce} from '../utils';


export default Controller.extend({


  channel: 'mini-map',


  events: {
    map: {
      started: 'onMapMove',
      move: 'onMapMove'
    }
  },


  /**
   * Start the view.
   */
  initialize: function() {

    let data = Radio.channel('data');

    // Wait for the burials to load.
    let getBurials = new Promise((resolve, reject) => {
      data.once('burials', resolve);
    });

    waitOnce('data', 'burials').then(burials => {

      // Start the view.
      this.view = new MiniMap({
        china: china,
        burials: burials
      });

      this.listen();

    });

  },


  /**
   * Update the map extent box.
   */
  onMapMove: function() {
    let extent = Radio.channel('map').request('visibleExtent');
    this.view.setExtent(extent);
  },


});
