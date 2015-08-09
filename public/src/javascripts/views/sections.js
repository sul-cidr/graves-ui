

import $ from 'jquery';
import View from '../lib/view';
import * as styles from './sections.yml';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter .section': 'onEnter',
    'mouseleave .section': 'onLeave',
  },


  /**
   * Select sections.
   */
  initialize: function() {
    this.sections = this.$('.section');
  },


  /**
   * When the cursor enters a section.
   *
   * @param {Object} e
   */
  onEnter: function(e) {
    console.log(e);
  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave: function(e) {
    console.log(e);
  },


  /**
   * Scroll a section into view.
   *
   * @param {String} slug
   */
  select: function(slug) {

    // Find the section element.
    let section = this.getSectionBySlug(slug);
    if (!section) return;

    // Scroll to selection.
    this.$el.animate({
      scrollTop: section[0].offsetTop
    }, {
      duration: styles.duration
    });

  },


  /**
   * Get the section with a given slug.
   *
   * @param {String} slug
   */
  getSectionBySlug: function(slug) {
    return this.$(`.section[data-slug=${slug}]`);
  },


});
