

import _ from 'lodash';
import Radio from 'backbone.radio';
import Backbone from 'backbone';


/**
 * Set options, initialize, bind callbacks.
 *
 * @param {Object} options
 */
var Controller = function(options={}) {

  this.options = options;

  // Set the local channel.
  if (_.isString(this.channel)) {
    this.channel = Radio.channel(this.channel);
  } else {
    throw new Error('Missing local channel.');
  }

  if (_.isFunction(this.initialize)) {
    this.initialize(this.options);
  }

};


// Patch in Backbone's `extend`.
Controller.extend = Backbone.Model.extend;


/**
 * Bind all mappings.
 */
Controller.prototype.listen = function() {
  this._bindEvents();
  this._bindRequests();
};


/**
 * Bind event mappings.
 */
Controller.prototype._bindEvents = function() {

  _.each(this.events, (map, channelName) => {

    // Connect to channel.
    let channel = Radio.channel(channelName);

    // Bind events -> callbacks.
    _.each(map, (method, event) => {
      channel.on(event, this[method], this);
    });

  });

};


/**
 * Bind request mappings to the local channel.
 */
Controller.prototype._bindRequests = function() {

  // Halt if no requests.
  if (!_.isObject(this.requests)) return;

  // Bind requests -> callbacks.
  _.each(this.requests, (method, request) => {
    this.channel.reply(request, this[method], this);
  });

};


export default Controller;
