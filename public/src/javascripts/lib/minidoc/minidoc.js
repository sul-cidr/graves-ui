

import d3 from 'd3';
import $ from 'jquery';


class MiniDoc {


  /**
   * Select the source / target elements, inject markup.
   *
   * @param {String} source
   * @param {String} target
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
