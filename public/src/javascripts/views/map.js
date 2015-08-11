

import _ from 'lodash';
import $ from 'jquery';
import L from 'leaflet';
import wellknown from 'wellknown';
import * as omnivore from 'leaflet-omnivore'
import {swap} from '../utils'
import styles from './map.yml';
import View from '../lib/view';


export default View.extend({


  el: '#map',


  channels: ['map', 'burials', 'sections'],


  /**
   * Start the map.
   *
   * @param {Object} data
   */
  initialize: function(data) {

    this.data = data;

    this._initLeaflet();
    this._initEvents();
    this._initProvinces();
    this._initSections();
    this._initBurials();

  },


  /**
   * Spin up the Leaflet instance.
   */
  _initLeaflet: function() {

    this.map = L.map(this.el, {
      zoomControl: false,
      attributionControl: false,
      fadeAnimation: false,
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    this.map.addControl(zoomControl);

    // OSM base layer.
    let osmLayer = L.tileLayer(
      '//{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    this.map.addLayer(osmLayer);

    // Default viewport.
    this.map.setView(
      styles.viewport.focus,
      styles.viewport.zoom
    );

  },


  /**
   * Bind map-level events.
   */
  _initEvents: function() {

    // Notify move.
    this.map.on('move', () => {
      this.channels.map.trigger('move');
    });

  },


  // ** Features:


  /**
   * Plot provinces.
   */
  _initProvinces: function() {

    // Parse WKT -> GeoJSON.
    let features = this.data.provinces.map(c => {
      let points = wellknown(c.geom);
      return new L.GeoJSON(points, styles.province);
    });

    // Add feature group to map.
    this.counties = L.featureGroup(features);
    this.counties.addTo(this.map);

  },


  /**
   * Plot burials.
   */
  _initBurials: function() {

    this.idToBurial = {};

    // Parse WKT -> GeoJSON.
    let features = this.data.burials.map(b => {

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
      feature.bindPopup(b.town, {
        closeButton: false
      });

      // Map id -> feature.
      this.idToBurial[b.id] = feature;

      return feature;

    });

    // Add feature group to map.
    this.burials = L.featureGroup(features);
    this.burials.addTo(this.map);

    // Highlight.
    this.burials.on(
      'mouseover',
      this.onHighlightBurial.bind(this)
    );

    // Unhighlight.
    this.burials.on(
      'mouseout',
      this.onUnhighlightBurial.bind(this)
    );

    // Select.
    this.burials.on(
      'click',
      this.onSelectBurial.bind(this)
    );

  },


  /**
   * Draw section rectangles.
   */
  _initSections: function() {

    this.slugToLabel = {};
    this.slugToBox = {};

    let labels = [], boxes = [];
    for (let s of this.data.sections) {

      // ** Create the box.

      let points = [
        [s.ymin, s.xmin],
        [s.ymax, s.xmin],
        [s.ymax, s.xmax],
        [s.ymin, s.xmax],
        [s.ymin, s.xmin]
      ];

      let box = L.polygon(
        points,
        _.clone(styles.section.default)
      );

      boxes.push(box);

      // ** Create the label.

      let icon = L.divIcon({
        html: s.label,
        iconSize: null
      });

      let label = L.marker([s.ymin, s.xmin], {
        icon: icon,
        slug: s.slug
      });

      labels.push(label);

      // Map slug -> section.
      this.slugToLabel[s.slug] = label;
      this.slugToBox[s.slug] = box;

    }

    // Add boxes.
    this.boxes = L.featureGroup(boxes);
    this.boxes.addTo(this.map);

    // Add labels.
    this.labels = L.featureGroup(labels);
    this.labels.addTo(this.map);

    // Highlight.
    this.labels.on(
      'mouseover',
      this.onHighlightSection.bind(this)
    );

    // Unhighlight.
    this.labels.on(
      'mouseout',
      this.onUnhighlightSection.bind(this)
    );

    // Select.
    this.labels.on(
      'click',
      this.onSelectSection.bind(this)
    );

  },


  // ** Publishers:


  /**
   * When a burial is highlighted.
   *
   * @param {Object} e
   */
  onHighlightBurial: function(e) {
    this.channels.burials.trigger('highlight', e.layer.options.id);
    e.layer.openPopup();
  },


  /**
   * When a burial is unhighlighted.
   *
   * @param {Object} e
   */
  onUnhighlightBurial: function(e) {
    this.channels.burials.trigger('unhighlight', e.layer.options.id);
    e.layer.closePopup();
  },


  /**
   * When a burial is clicked.
   *
   * @param {Object} e
   */
  onSelectBurial: function(e) {
    this.channels.burials.trigger('select', e.layer.options.id);
  },


  /**
   * When a section is highlighted.
   *
   * @param {Object} e
   */
  onHighlightSection: function(e) {
    this.channels.sections.trigger('highlight', e.layer.options.slug);
  },


  /**
   * When a section is unhighlighted.
   *
   * @param {Object} e
   */
  onUnhighlightSection: function(e) {
    this.channels.sections.trigger('unhighlight', e.layer.options.slug);
  },


  /**
   * When a section is clicked.
   *
   * @param {Object} e
   */
  onSelectSection: function(e) {
    this.channels.sections.trigger('select', e.layer.options.slug);
  },


  // ** Renderers:


  /**
   * Highlight a burial.
   *
   * @param {Number} id
   */
  highlightBurial: function(id) {
    let marker = this.idToBurial[id];
    marker.setStyle(styles.burial.highlight);
  },


  /**
   * Unhighlight a burial.
   *
   * @param {Number} id
   */
  unhighlightBurial: function(id) {
    let marker = this.idToBurial[id];
    marker.setStyle(styles.burial.default);
  },


  /**
   * Focus on a burial.
   *
   * @param {Number} id
   */
  selectBurial: function(id) {
    let marker = this.idToBurial[id];
    this.map.flyTo(marker.getLatLng(), styles.zoom.burial);
  },


  /**
   * Highlight a section.
   *
   * @param {String} slug
   */
  highlightSection: function(slug) {

    // Add class to label.
    let label = $(this.slugToLabel[slug]._icon);
    label.addClass('highlight');

    // Highlight box path.
    let box = this.slugToBox[slug];
    box.setStyle(styles.section.highlight);

  },


  /**
   * Unhighlight a section.
   *
   * @param {String} slug
   */
  unhighlightSection: function(slug) {

    // Add class to label.
    let label = $(this.slugToLabel[slug]._icon);
    label.removeClass('highlight');

    // Highlight box path.
    let box = this.slugToBox[slug];
    box.setStyle(styles.section.default);

  },


  /**
   * Select a section.
   *
   * @param {String} slug
   */
  selectSection: function(slug) {
    let box = this.slugToBox[slug];
    this.map.flyTo(box.getBounds().getCenter(), styles.zoom.section);
  },


  // ** Helpers


  /**
   * Get the window-space offset of a burial marker.
   *
   * @param {Number} id
   * @return {Array}
   */
  getBurialOffset: function(id) {

    // ID -> coordinate.
    let latLng = this.idToBurial[id].getLatLng();

    // Coordinate -> layer point.
    let layerPoint = this.map.latLngToLayerPoint(latLng);

    // Coordinate -> layer point.
    let point = this.map.layerPointToContainerPoint(layerPoint);

    return [point.x, point.y];

  },


  /**
   * Is a section "focused" on the screen?
   *
   * @param {String} slug
   * @return {Boolean}
   */
  isSectionFocused: function(slug) {

    // Get section and map centers.
    let sCenter = this.slugToBox[slug].getBounds().getCenter();
    let mCenter = this.map.getCenter();

    // Measure distance to section center.
    // TODO: Make this more robust?
    let d = mCenter.distanceTo(sCenter);

    return d < styles.focus.threshold;

  },


  /**
   * Get the visible extent of the map.
   *
   * @return {?}
   */
  getVisibleExtent: function(slug) {

    let t = $('#text');
    let w = $(window);

    let tw = t.offset().left + t.outerWidth();
    let ww = w.width();
    let wh = w.height();

    return {
      topLeft: this.map.containerPointToLatLng([tw, 0]),
      bottomRight: this.map.containerPointToLatLng([ww, wh]),
    };

  },


});
