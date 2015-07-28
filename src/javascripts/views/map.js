

import $ from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';


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

    this.map = L.map(this.el);

    // Create an OSM tile layer.
    var url = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    L.tileLayer(url).addTo(this.map);

    // TODO: Where to focus?
    this.map.setView([30, 110], 5);

  },


});
