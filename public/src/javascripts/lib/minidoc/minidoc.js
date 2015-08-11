

import d3 from 'd3';
import $ from 'jquery';


class MiniDoc {


  /**
   * Select the source / target elements, inject markup.
   *
   * @param {String} source - A CSS selector for the element that's being
   * represented on the mini doc.
   *
   * @param {String} target - A CSS selector for the element that should
   * contain the rendered mini doc.
   */
  constructor(source, target) {

    // d3 containers.
    this.source = d3.select(source);
    this.target = d3.select(target);

    // jQuery containers.
    this.$source = $(source);
    this.$target = $(target);

    // Inject the SVG container.
    this.svg = this.source.append('svg');

  }


}
