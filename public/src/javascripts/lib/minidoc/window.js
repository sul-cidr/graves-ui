

import $ from 'jquery';
import Plugin from './plugin';


export default class Window extends Plugin {


  /**
   * Create markup, listen for scroll.
   */
  mount() {
    this._injectOccluders();
    this._bindScrollEvent();
  }


  /**
   * Inject the "cover" regions.
   */
  _injectOccluders() {

    // Top occluder:
    this.top = this.minidoc.svg
      .append('rect')
      .classed('occluder', true);

    // Bottom occluder:
    this.bottom = this.minidoc.svg
      .append('rect')
      .classed('occluder', true);

  }


  /**
   * Listen for scroll.
   */
  _bindScrollEvent() {
    this.minidoc.$source.scroll(this.position.bind(this));
    this.position();
  }


  /**
   * Position the occlusion overlays.
   */
  position() {

    let ratio         = this.minidoc.getTargetRatio();
    let targetWidth   = this.minidoc.$target.outerWidth();
    let targetHeight  = this.minidoc.$target.outerHeight();
    let sourceHeight  = this.minidoc.$source.outerHeight();
    let scrollTop     = this.minidoc.$source.scrollTop();
    let scrollHeight  = this.minidoc.$source[0].scrollHeight;
    let topHeight     = scrollTop * ratio;
    let bottomOffset  = (sourceHeight + scrollTop) * ratio;
    let bottomHeight  = (scrollHeight - (scrollTop + sourceHeight)) * ratio;

    this.top.attr({
      x: 0,
      y: 0,
      width: targetWidth,
      height: topHeight
    });

    this.bottom.attr({
      x: 0,
      y: bottomOffset,
      width: targetWidth,
      height: bottomHeight
    });

  }


}
