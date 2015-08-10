

import _ from 'lodash';
import $ from 'jquery';
import View from '../lib/view';
import * as styles from './sections.yml';
import tipTpl from './tip.jade'


export default View.extend({


  el: '#text',


  events: {
    'mouseenter .section': 'onEnter',
    'mouseleave .section': 'onLeave',
  },


  channels: ['map', 'sections'],


  /**
   * Start the sections.
   */
  initialize: function() {
    this._initOffset();
  },


  /**
   * Set offset on resize.
   */
  _initOffset: function() {

    this.setOffset();

    // Re-cache on resize.
    let resize = _.debounce(this.setOffset.bind(this), 500);
    $(window).resize(resize);

  },


  /**
   * Cache offset of the right boundary of the container.
   */
  setOffset: function() {
    this.rightX = this.$el.offset().left + this.$el.outerWidth() + 10;
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
      this.setUnfocused(section);
    }

  },


  /**
   * When the cursor leaves a section.
   *
   * @param {Object} e
   */
  onLeave: function(e) {
    this.setFocused($(e.currentTarget));
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

    this.setFocused(section);

  },


  /**
   * Get the section with a given slug.
   *
   * @param {String} slug
   */
  getSectionBySlug: function(slug) {
    return this.$(`.section[data-slug=${slug}]`);
  },


  /**
   * Set a section unfocused.
   *
   * @param {Object} section
   */
  setUnfocused: function(section) {

    // Add class.
    section.addClass('unfocused');

    // Select on click.
    section.click(e => {
      let slug = section.attr('data-slug');
      this.channels.sections.trigger('select', slug);
    });

    // Inject the tooltip.
    this.tip = $(tipTpl({
      content: 'Click to focus'
    }));

    this.tip.appendTo('body');

    this.$el.mousemove(e => {
      this.tip.css({ top: e.clientY, left: this.rightX });
    });

  },


  /**
   * Set a section focused.
   *
   * @param {Object} section
   */
  setFocused: function(section) {
    section.off('click');
    section.removeClass('unfocused');
    this.tip.remove();
  },


});
