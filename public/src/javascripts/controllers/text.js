

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
      select: 'onSelectSection'
    }

  },


  /**
   * Start the view.
   */
  initialize: function() {
    this.view = new Text();
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
   * Focus on a section.
   *
   * @param {String} slug
   */
  onSelectSection: function(slug) {
    this.view.selectSection(slug);
  },


});
