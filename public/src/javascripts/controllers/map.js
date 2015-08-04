

import $ from 'jquery';
import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  /**
   * Start the view.
   */
  initialize: function() {

    this.view = new Map();

    this.loadProvinces();
    this.loadBurials();

  },


  /**
   * Load province polygons.
   */
  loadProvinces: function() {
    $.getJSON('provinces', (data) => {
      this.view.plotProvinces(data);
    });
  },


  /**
   * Load burial sites.
   */
  loadBurials: function() {
    $.getJSON('burials', (data) => {
      this.view.plotBurials(data);
    });
  },


});
