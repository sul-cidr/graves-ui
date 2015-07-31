

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

    this.plotTowns();
    this.plotCounties();

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
   * Plot towns.
   */
  plotTowns: function() {
    $.getJSON('towns', (data) => {
      for (var t of data) {

        // Parse WKT.
        var point = wellknown(t.geom).coordinates[0];

        // Create the marker.
        var layer = L.circleMarker(swap(point), styles.town);
        this.map.addLayer(layer);

      }
    });
  },


  /**
   * Plot counties.
   */
  plotCounties: function() {
    $.getJSON('counties', (data) => {
      for (var c of data) {

        // Parse WKT.
        var points = wellknown(c.geom);

        // Create the polygon.
        var layer = new L.GeoJSON(points, styles.county);
        this.map.addLayer(layer);

      }
    });
  },


});
