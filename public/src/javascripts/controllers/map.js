

import $ from 'jquery';
import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  channel: 'map',


  requests: {
    burialOffset: 'getBurialOffset',
  },


  /**
   * Start the view.
   */
  initialize: function() {

    this.view = new Map();

    this._loadProvinces();
    this._loadBurials();

  },


  /**
   * Load province polygons.
   */
  _loadProvinces: function() {
    $.getJSON('provinces', (data) => {
      this.view.plotProvinces(data);
    });
  },


  /**
   * Load burial sites.
   */
  _loadBurials: function() {
    $.getJSON('burials', (data) => {
      this.view.plotBurials(data);
    });
  },


  /**
   * Given a burial id, get the window-space offset of the marker.
   *
   * @param {Number} id
   */
  getBurialOffset: function(id) {
    return this.view.getBurialOffset(id);
  },


});
