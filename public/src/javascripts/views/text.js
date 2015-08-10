

import _ from 'lodash';
import $ from 'jquery';
import View from '../lib/view';
import * as styles from './text.yml';


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
    let slug = this.getSectionSlugFromEvent(e);
    this.channels.sections.trigger('highlight', slug);
  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onSectionLeave: function(e) {
    let slug = this.getSectionSlugFromEvent(e);
    this.channels.sections.trigger('unhighlight', slug);
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

    let section = this.getSectionBySlug(slug);

    // Scroll to the section.
    this.$el.animate({
      scrollTop: section[0].offsetTop
    }, {
      duration: styles.duration
    });

  },


  // ** Helpers:


  /**
   * Get a burial ID from a cursor event.
   *
   * @param {Object} e
   * @returns {Number}
   */
  getBurialIdFromEvent: function(e) {
    return Number($(e.currentTarget).attr('data-id'));
  },


  /**
   * Get a section slug from a cursor event.
   *
   * @param {Object} e
   * @returns {String}
   */
  getSectionSlugFromEvent: function(e) {
    return $(e.currentTarget).attr('data-slug');
  },


  /**
   * Get burial spans by id.
   *
   * @param {Number} id
   * @return {Object}
   */
  getBurialsById: function(id) {
    return this.$(`span.burial[data-id=${id}]`)
  },


  /**
   * Get a section by slug.
   *
   * @param {String} slug
   * @return {Object}
   */
  getSectionBySlug: function(slug) {
    return this.$(`.section[data-slug=${slug}]`);
  },


});
