

import $ from 'jquery';
import View from '../lib/view';
import * as styles from './sections.yml';


export default View.extend({


  el: '#text',


  events: {
    'mouseenter .section': 'onEnter',
    'mouseleave .section': 'onLeave',
  },


  channels: ['map'],


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

    let section = $(e.currentTarget);
    let slug = section.attr('data-slug');

    // Is the section focused on the map?
    let focused = this.channels.map.request('sectionFocused', slug);

    if (!focused) {

      section.addClass('unfocused');

      // TODO: Click to select.
      section.click(e => {
        console.log('select');
      });

    }

  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave: function(e) {
    let section = $(e.currentTarget);
    section.off('click');
    section.removeClass('unfocused');
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
