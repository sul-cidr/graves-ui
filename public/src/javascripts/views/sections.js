

import $ from 'jquery';
import View from '../lib/view';


export default View.extend({


  el: '#text',


  /**
   * Select sections.
   */
  initialize: function() {
    this.sections = this.$('.section');
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

    console.log(section.offset().top);

    // Scroll to selection.
    this.$el.animate({
      scrollTop: section[0].offsetTop
    }, {
      duration: 500
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
