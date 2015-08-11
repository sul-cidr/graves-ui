

import $ from 'jquery';
import Radio from 'backbone.radio';
import Controller from '../lib/controller';
import Map from '../views/map';
import sections from '../data/sections.yml';
import {waitOnce} from '../utils';


export default Controller.extend({


  channel: 'map',


  events: {

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
    visibleExtent: 'getVisibleExtent',
  },


  /**
   * Start the view.
   */
  initialize: function() {

    Promise.all([
      waitOnce('data', 'provinces'),
      waitOnce('data', 'burials')
    ]).then(res => {

      // Start the view.
      this.view = new Map({
        provinces: res[0],
        burials: res[1],
        sections: sections,
      });

      this.listen();

    });

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


  /**
   * Get the visible extent rectangle.
   *
   * @returns {Object}
   */
  getVisibleExtent: function(slug) {
    return this.view.getVisibleExtent();
  },


});
