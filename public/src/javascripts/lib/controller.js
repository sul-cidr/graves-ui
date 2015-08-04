

import _ from 'lodash';
import Radio from 'backbone.radio';
import Backbone from 'backbone';


class Controller {


  /**
   * Set options, bind callbacks.
   *
   * @param {Object} options
   */
  constructor(options={}) {

    this.options = options;

    if (_.isFunction(this.initialize)) {
      this.initialize(options);
    }

    this._bindEvents();
    this._bindRequests();

  }


}
