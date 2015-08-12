

import d3 from 'd3';
import $ from 'jquery';


export default class MiniDoc {


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
    this.svg = this.target.append('svg');

    this.plugins = [];
    this.resize();

  }


  /**
   * Set the SVG container size.
   */
  resize() {
    let height = this.getTargetPx(this.$source[0].scrollHeight);
    this.svg.style('height', height);
    this.$target.css('height', height);
  }


  /**
   * Register a plugin instance.
   *
   * @param {Plugin} plugin
   */
  add(plugin) {
    this.plugins.push(plugin);
    plugin.setDoc(this);
  }


  /**
   * Get a multiplier to convert source pixels -> target pixels.
   *
   * @return {Number}
   */
  getTargetRatio() {
    return this.$target.outerWidth() / this.$source.outerWidth();
  }


  /**
   * Scale source pixels -> target pixels.
   *
   * @param {Number} sourcePx
   * @return {Number}
   */
  getTargetPx(sourcePx) {
    return this.getTargetRatio() * sourcePx;
  }


}
