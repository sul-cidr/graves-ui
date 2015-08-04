

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

  if (_.isFunction(this.initialize)) {
    this.initialize(this.options);
  }

  this._bindEvents();
  this._bindRequests();

};


// Patch in Backbone's `extend`.
Controller.extend = Backbone.Model.extend;


/**
 * Bind event mappings.
 */
Controller.prototype._bindEvents = function() {

  _.each(this.events, (map, channelName) => {

    // Connect to channel.
    let channel = Radio.channel(channelName);

    // Bind events -> callbacks.
    for (let [event, method] of map) {
      channel.on(event, this[method], this);
    }

  });

};


/**
 * Bind request mappings to the local channel.
 */
Controller.prototype._bindRequests = function() {

  // Half if no requests.
  if (!_.isObject(this.requests)) return;

  // Error if no channel name..
  else if (!_.isString(this.channel)) {
    throw new Error('You must provide a local channel name.');
  }

  // Set the localchannel.
  this.channel = Radio.channel(this.channel);

  // Bind requests -> callbacks.
  _.each(this.requests, (method, request) => {
    this.channel.reply(request, this[method], this);
  });

};


export default Controller;
