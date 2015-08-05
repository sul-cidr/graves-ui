

import $ from 'jquery';
import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  channel: 'map',


  events: {
    global: {
      select: 'onSelect'
    }
  },


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
   * Focus on a burial site.
   *
   * @param {Number} id
   */
  onSelect: function(id) {
    // TODO
  },


  /**
   * Get the window-space offset of a burial marker.
   *
   * @param {Number} id
   */
  getBurialOffset: function(id) {
    return this.view.getBurialOffset(id);
  },


});
