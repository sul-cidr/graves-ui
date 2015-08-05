

import $ from 'jquery';
import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  channel: 'map',


  events: {
    global: {
      highlight: 'onHighlight',
      unhighlight: 'onUnhighlight',
      select: 'onSelect',
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
      this.view.ingestProvinces(data);
    });
  },


  /**
   * Load burial sites.
   */
  _loadBurials: function() {
    $.getJSON('burials', (data) => {
      this.view.ingestBurials(data);
    });
  },


  /**
   * Highlight a burial site.
   *
   * @param {Number} id
   */
  onHighlight: function(id) {
    this.view.highlight(id);
  },


  /**
   * Unhighlight a burial site.
   *
   * @param {Number} id
   */
  onUnhighlight: function(id) {
    this.view.unhighlight(id);
  },


  /**
   * Focus on a burial site.
   *
   * @param {Number} id
   */
  onSelect: function(id) {
    this.view.select(id);
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
