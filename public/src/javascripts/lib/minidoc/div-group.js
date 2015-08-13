

import $ from 'jquery';
import Plugin from './plugin';
import Pair from './pair';


export default class DivGroup extends Plugin {


  /**
   * Set the group selector.
   *
   * @param {String} selector
   * @param {String} className
   */
  constructor(selector, className) {
    super();
    this.selector = selector;
    this.className = className;
  }


  /**
   * Add the group.
   */
  mount() {

    this.pairs = [];

    // Iterate source elements.
    this.minidoc.$source.find(this.selector).each((i, el) => {

      let source = $(el);

      // Inject the avatar.
      let target = this.minidoc.svg
        .append('rect')
        .classed(this.className, true);

      // Register the pairing.
      this.pairs.push(new Pair(source, target));

    });

    this.position();

  }


  /**
   * Position the avatars.
   */
  position() {

    // Get the scaling ratio.
    let ratio = this.minidoc.getTargetRatio();

    // Get the offset of the source container.
    let sourceOffset = this.minidoc.$source.offset();
    let scrollTop = this.minidoc.$source[0].scrollTop;

    for (let pair of this.pairs) {

      let offset = pair.source.offset();

      let x = (offset.left - sourceOffset.left) * ratio;
      let y = (offset.top - sourceOffset.top + scrollTop) * ratio;
      let w = pair.source.outerWidth() * ratio;
      let h = pair.source.outerHeight() * ratio;

      pair.target.attr({
        x: x,
        y: y,
        height: h,
        width: w,
      });

    }

  }


}
