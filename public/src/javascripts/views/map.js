

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import wellknown from 'wellknown';
import * as omnivore from 'leaflet-omnivore'
import {swap} from '../utils'
import * as styles from './map.yml';


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

      // Create the polygon.
      let feature = new L.GeoJSON(
        wellknown(c.geom), styles.county
      );

      // Highlight.
      feature.on(
        'mouseover',
        this.highlightProvince.bind(this)
      );

      // Unhighlight.
      feature.on(
        'mouseout',
        this.unhighlightProvince.bind(this)
      );

      return feature;

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

      // Assume 20 graves. TODO: Valid?
      let count = b.count || 20;

      // Apply the grave size.
      let style = _.merge(styles.burial, {
        radius: Math.log(count)*3
      });

      return L.circleMarker(swap(point), style);

    });

    // Add feature group to map.
    this.towns = L.featureGroup(features);
    this.towns.addTo(this.map);

  },


  /**
   * Highlight a province.
   *
   * @param {Object} e
   */
  highlightProvince: function(e) {
    console.log('highlight', e);
  },


  /**
   * Unhighlight a province.
   *
   * @param {Object} e
   */
  unhighlightProvince: function(e) {
    console.log('unhighlight', e);
  },


});
