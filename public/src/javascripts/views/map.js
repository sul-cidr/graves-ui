

import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import wellknown from 'wellknown';
import * as omnivore from 'leaflet-omnivore'
import {swap} from '../utils'
import * as styles from './map.yml';
import burialTpl from './burial.jade'
import View from '../lib/view';


export default View.extend({


  el: '#map',


  channels: ['global'],


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
      zoomControl: false,
      fadeAnimation: false,
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

    // Default viewport.
    this.map.setView(
      styles.viewport.focus,
      styles.viewport.zoom
    );

  },


  // ** Features:


  /**
   * Plot provinces.
   *
   * @param {Object} data
   */
  ingestProvinces: function(data) {

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
  ingestBurials: function(data) {

    this.idToSite = {};

    // Parse WKT -> GeoJSON.
    let features = data.map(b => {

      // Extract the lon/lat.
      let point = wellknown(b.geom).coordinates[0];

      // Copy the SVG defaults.
      let options = _.clone(styles.burial.default);

      // Create the marker.
      let feature = L.circleMarker(
        swap(point),
        _.merge(options, {id: b.id})
      );

      // Set radius. (Default to 20 graves?)
      feature.setRadius(Math.log(b.count || 20)*3);

      // Attach the popup.
      feature.bindPopup(burialTpl({ name: b.town }), {
        closeButton: false
      });

      // Map id -> feature.
      this.idToSite[b.id] = feature;

      return feature;

    });

    // Add feature group to map.
    this.sites = L.featureGroup(features);
    this.sites.addTo(this.map);

    // Highlight.
    this.sites.on(
      'mouseover',
      this.onHighlight.bind(this)
    );

    // Unhighlight.
    this.sites.on(
      'mouseout',
      this.onUnhighlight.bind(this)
    );

  },


  // ** Publishers:


  /**
   * When a burial is highlighted.
   *
   * @param {Object} e
   */
  onHighlight: function(e) {
    e.layer.openPopup();
    this.channels.global.trigger('highlight', e.layer.options.id);
  },


  /**
   * When a burial is unhighlighted.
   *
   * @param {Object} e
   */
  onUnhighlight: function(e) {
    e.layer.closePopup();
    this.channels.global.trigger('unhighlight', e.layer.options.id);
  },


  // ** Renderers:


  /**
   * Highlight a burial.
   *
   * @param {Number} id
   */
  highlight: function(id) {
    let marker = this.idToSite[id];
    marker.setStyle(styles.burial.highlight);
  },


  /**
   * Unhighlight a burial.
   *
   * @param {Number} id
   */
  unhighlight: function(id) {
    let marker = this.idToSite[id];
    marker.setStyle(styles.burial.default);
  },


  /**
   * Focus on a burial.
   *
   * @param {Number} id
   */
  select: function(id) {
    let marker = this.idToSite[id];
    this.map.flyTo(marker.getLatLng(), styles.selection.zoom);
  },


  // ** Helpers


  /**
   * Get the window-space offset of a burial marker.
   *
   * @param {Number} id
   */
  getBurialOffset: function(id) {

    // ID -> coordinate.
    let latLng = this.idToSite[id].getLatLng();

    // Coordinate -> layer point.
    let layerPoint = this.map.latLngToLayerPoint(latLng);

    // Coordinate -> layer point.
    let point = this.map.layerPointToContainerPoint(layerPoint);

    return [point.x, point.y];

  },


});
