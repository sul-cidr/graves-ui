

import $ from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import wellknown from 'wellknown';
import {swap} from '../utils'


export default Backbone.View.extend({


  el: '#map',


  /**
   * Start the map.
   */
  initialize: function() {
    this._initLeaflet();
    this._initTowns();
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
  _initTowns: function() {
    $.getJSON('towns', (data) => {
      for (var t of data) {

        // Parse WKT.
        var point = wellknown(t.geom).coordinates[0];

        // Create the marker.
        var marker = L.circleMarker(swap(point), {
          radius: 2,
          fillColor: 'red',
          opacity: 0.9,
          stroke: false,
        });

        // Render on map.
        this.map.addLayer(marker);

      }
    });
  },


});
