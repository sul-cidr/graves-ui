

import Controller from '../lib/controller';
import Text from '../views/text';


export default Controller.extend({


  channel: 'text',


  events: {

    burials: {
      highlight: 'onHighlightBurial',
      unhighlight: 'onUnhighlightBurial',
    },

    sections: {
      highlight: 'onHighlightSection',
      unhighlight: 'onUnhighlightSection',
      select: 'onSelectSection'
    }

  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Text();
    this.start();
  },


  /**
   * Highlight burial spans.
   *
   * @param {Number} id
   */
  onHighlightBurial: function(id) {
    this.view.highlightBurial(id);
  },


  /**
   * Unhighlight burial spans.
   *
   * @param {Number} id
   */
  onUnhighlightBurial: function(id) {
    this.view.unhighlightBurial(id);
  },


  /**
   * Highlight a section.
   *
   * @param {String} slug
   */
  onHighlightSection: function(slug) {
    this.view.highlightSection(slug);
  },


  /**
   * Unhighlight a section.
   *
   * @param {String} slug
   */
  onUnhighlightSection: function(slug) {
    this.view.unhighlightSection(slug);
  },


  /**
   * Focus on a section.
   *
   * @param {String} slug
   */
  onSelectSection: function(slug) {
    this.view.selectSection(slug);
  },


});
