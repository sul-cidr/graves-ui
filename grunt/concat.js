

export default {

  polyfill: {

    // Prepend the polyfill to the payload.
    src: [
      'node_modules/babel-core/browser-polyfill.js',
      '<%= browserify.dist.dest %>',
    ],

    dest: '<%= browserify.dist.dest %>'

  },

};
