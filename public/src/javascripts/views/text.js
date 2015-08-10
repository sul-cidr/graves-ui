

import _ from 'lodash';
import $ from 'jquery';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  events: {

    // Burials:
    'mouseenter span.burial': 'onBurialEnter',
    'mouseleave span.burial': 'onBurialLeave',
    'click span.burial': 'onBurialClick',

    // Sections:
    'mouseenter .section': 'onSectionEnter',
    'mouseleave .section': 'onSectionLeave',

  },


  channels: ['text', 'burials', 'sections'],


  // ** Publishers:


  /**
   * When the cursor enters a span.
   *
   * @param {Object} e
   */
  onBurialEnter: function(e) {
    let id = this.getBurialIdFromEvent(e);
    this.channels.burials.trigger('highlight', id);
    this.channels.text.trigger('hover', e);
  },


  /**
   * When the cursor leaves a span.
   *
   * @param {Object} e
   */
  onBurialLeave: function(e) {
    let id = this.getBurialIdFromEvent(e);
    this.channels.burials.trigger('unhighlight', id);
  },


  /**
   * When a span is clicked.
   *
   * @param {Object} e
   */
  onBurialClick: function(e) {
    let id = this.getBurialIdFromEvent(e);
    this.channels.burials.trigger('select', id);
  },


  /**
   * When the cursor enters a section.
   *
   * @param {Object} e
   */
  onSectionEnter: function(e) {
    // TODO
  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onSectionLeave: function(e) {
    // TODO
  },


  // ** Renderers:


  /**
   * Highlight burial spans.
   *
   * @param {Number} id
   */
  highlightBurial: function(id) {
    this.getBurialsById(id).addClass('highlight');
  },


  /**
   * Unhighlight burial spans.
   *
   * @param {Number} id
   */
  unhighlightBurial: function(id) {
    this.getBurialsById(id).removeClass('highlight');
  },


  /**
   * Unhighlight burial spans.
   *
   * @param {String} slug
   */
  selectSection: function(slug) {
    // TODO
  },


  // ** Helpers:


  /**
   * Get a burial ID from a cursor event.
   *
   * @param {Number} id
   */
  getBurialIdFromEvent: function(e) {
    return Number($(e.currentTarget).attr('data-id'));
  },


  /**
   * Get burial spans by id.
   *
   * @param {Number} id
   */
  getBurialsById: function(id) {
    return this.$(`span.burial[data-id=${id}]`)
  },


});
