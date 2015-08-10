

import $ from 'jquery';
import Radio from 'backbone.radio';
import Controller from '../lib/controller';
import Map from '../views/map';
import * as data from './map.yml';


export default Controller.extend({


  channel: 'data',


  /**
   * Load data on startup.
   */
  initialize: function() {

    this.channel = Radio.channel('data');

    this._loadProvinces();
    this._loadBurials();
    this._loadSections();

  },


  /**
   * Load province polygons.
   */
  _loadProvinces: function() {
    $.getJSON('provinces', json => {
      this.channel.trigger('provinces', json);
    });
  },


  /**
   * Load burial sites.
   */
  _loadBurials: function() {
    $.getJSON('burials', json => {
      this.channel.trigger('burials', json);
    });
  },


  /**
   * Load section regions.
   */
  _loadSections: function() {
    this.channel.trigger('sections', data.sections);
  },


});
