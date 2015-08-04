

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import wellknown from 'wellknown';
import * as omnivore from 'leaflet-omnivore'
import {swap} from '../utils'
import * as styles from './map.yml';
import burialTpl from './burial.jade'


export default Backbone.View.extend({


  el: '#map',


  /**
   * Start the map.
   */
  initialize: function() {
    this._initLeaflet();
  },


  /**
   * Spin up the Leaflet instance.
   */
  _initLeaflet: function() {

    this.map = L.map(this.el, {
      zoomControl: false
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    this.map.addControl(zoomControl);

    // OSM base layer.
    let osmLayer = L.tileLayer(
      '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    this.map.addLayer(osmLayer);

    // TODO: Where to focus?
    this.map.setView([30, 110], 5);

  },


  /**
   * Plot provinces.
   *
   * @param {Object} data
   */
  plotProvinces: function(data) {

    // Parse WKT -> GeoJSON.
    let features = data.map(c => {
      let points = wellknown(c.geom);
      return new L.GeoJSON(points, styles.province);
    });

    // Add feature group to map.
    this.counties = L.featureGroup(features);
    this.counties.addTo(this.map);

    // Move below points.
    this.counties.bringToBack();

  },


  /**
   * Plot burials.
   *
   * @param {Object} data
   */
  plotBurials: function(data) {

    // Parse WKT -> GeoJSON.
    let features = data.map(b => {

      // Extract the coordinates.
      let point = wellknown(b.geom).coordinates[0];

      // Create the marker.
      let feature = L.circleMarker(
        swap(point),
        styles.burial.default
      );

      // Set radius. (Default to 20 graves?)
      feature.setRadius(Math.log(b.count || 20)*3);

      // Attach the popup.
      feature.bindPopup(burialTpl({ name: b.town }), {
        closeButton: false
      });

      // Highlight.
      feature.on(
        'mouseover',
        this.highlightBurial.bind(this)
      );

      // Unhighlight.
      feature.on(
        'mouseout',
        this.unhighlightBurial.bind(this)
      );

      return feature;

    });

    // Add feature group to map.
    this.towns = L.featureGroup(features);
    this.towns.addTo(this.map);

  },


  /**
   * Highlight a burial.
   *
   * @param {Object} e
   */
  highlightBurial: function(e) {
    e.target.setStyle(styles.burial.highlight);
  },


  /**
   * Unhighlight a province.
   *
   * @param {Object} e
   */
  unhighlightBurial: function(e) {
    e.target.setStyle(styles.burial.default);
  },


});
