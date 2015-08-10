

import $ from 'jquery';
import Controller from '../lib/controller';
import Map from '../views/map';


export default Controller.extend({


  channel: 'map',


  events: {

    data: {
      provinces: 'ingestProvinces',
      burials: 'ingestBurials',
      sections: 'ingestSections',
    },

    burials: {
      highlight: 'onHighlightBurial',
      unhighlight: 'onUnhighlightBurial',
      select: 'onSelectBurial',
    },

    sections: {
      highlight: 'onHighlightSection',
      unhighlight: 'onUnhighlightSection',
      select: 'onSelectSection',
    }

  },


  requests: {
    burialOffset: 'getBurialOffset',
    sectionFocused: 'isSectionFocused',
  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Map();
    this.listen();
  },


  /**
   * Ingest provinces.
   *
   * @param {Object} provinces
   */
  ingestProvinces: function(provinces) {
    this.view.ingestProvinces(provinces);
  },


  /**
   * Load burial sites.
   *
   * @param {Object} burials
   */
  ingestBurials: function(burials) {
    this.view.ingestBurials(burials);
  },


  /**
   * Load section regions.
   *
   * @param {Object} sections
   */
  ingestSections: function(sections) {
    this.view.ingestSections(sections);
  },


  /**
   * Highlight a burial site.
   *
   * @param {Number} id
   */
  onHighlightBurial: function(id) {
    this.view.highlightBurial(id);
  },


  /**
   * Unhighlight a burial site.
   *
   * @param {Number} id
   */
  onUnhighlightBurial: function(id) {
    this.view.unhighlightBurial(id);
  },


  /**
   * Focus on a burial site.
   *
   * @param {Number} id
   */
  onSelectBurial: function(id) {
    this.view.selectBurial(id);
  },


  /**
   * Highlight a section box.
   *
   * @param {String} slug
   */
  onHighlightSection: function(slug) {
    this.view.highlightSection(slug);
  },


  /**
   * Unhighlight a section box.
   *
   * @param {String} slug
   */
  onUnhighlightSection: function(slug) {
    this.view.unhighlightSection(slug);
  },


  /**
   * Select a section box.
   *
   * @param {String} slug
   */
  onSelectSection: function(slug) {
    this.view.selectSection(slug);
  },


  /**
   * Get the window-space offset of a burial marker.
   *
   * @param {Number} id
   * @returns {Array}
   */
  getBurialOffset: function(id) {
    return this.view.getBurialOffset(id);
  },


  /**
   * Is the section for a given slug focused?
   *
   * @param {String} slug
   * @returns {Boolean}
   */
  isSectionFocused: function(slug) {
    return this.view.isSectionFocused(slug);
  },


});
