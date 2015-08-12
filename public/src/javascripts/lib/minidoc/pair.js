

export default class Pair {


  /**
   * Bind a jQuery-wrapped source element with its d3 target avatar.
   *
   * @param {Object} source
   * @param {Object} target
   */
  constructor(source, target) {

    this.source = source;
    this.target = target;

    this._bindEvents();

  }


  /**
   * Bind cursor events on the source and target.
   */
  _bindEvents() {

    this.source
      .on('mouseenter', this.highlightSource.bind(this))
      .on('mouseleave', this.unhighlight.bind(this));

    this.target
      .on('mouseenter', this.highlightTarget.bind(this))
      .on('mouseleave', this.unhighlight.bind(this));

  }


  /**
   * Apply a source highlight.
   */
  highlightSource() {

    this.target.classed({
      'highlight': true,
      'highlight-source': true
    });

    this.source.addClass(
      'highlight highlight-source'
    );

  }


  /**
   * Apply a target highlight.
   */
  highlightTarget() {

    this.target.classed({
      'highlight': true,
      'highlight-target': true
    });

    this.source.addClass(
      'highlight highlight-target'
    );

  }


  /**
   * Unhighlight both elements.
   */
  unhighlight() {

    this.target.classed({
      'highlight': false,
      'highlight-source': true,
      'highlight-target': true
    });

    this.source.addClass(
      'highlight highlight-target highlight-target'
    );

  }


}
