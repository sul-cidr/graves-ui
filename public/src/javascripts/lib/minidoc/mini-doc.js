

import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';


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

    // Active plugins.
    this.plugins = [];

    // Listen for resize (debounced).
    let resize = _.debounce(this.resize.bind(this), 500);
    $(window).resize(resize);

    this.resize();

  }


  /**
   * Set the SVG container size.
   */
  resize() {

    // Visible height of source -> target height.
    let height = this.getTargetPx(this.$source[0].scrollHeight);

    // Resize the minidoc / SVG.
    this.$target.css('height', height);
    this.svg.style('height', height);

    // Notify plugins.
    for (let plugin of this.plugins) {
      plugin.position();
    }

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
