

import Radio from 'backbone.radio';


/**
 * Reverse the order of a coordinate pair.
 *
 * @param {Array} point
 * @returns {Array}
 */
export function swap(point) {
  return [point[1], point[0]];
};


/**
 * Wait for a backbone.radio event to fire.
 *
 * @param {String} channel
 * @param {String} event
 * @returns {Promise}
 */
export function waitOnce(channel, event) {
  return new Promise((resolve, reject) => {
    Radio.channel(channel).once(event, resolve);
  });
};
