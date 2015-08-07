

export default {

  options: {

    transform: [
      'jadeify',
      'babelify',
      'yamlify',
    ],

    watch: true,
    browserifyOptions: {
      debug: true
    }

  },

  dist: {
    src: '<%= src %>/javascripts/index.js',
    dest: '<%= dist %>/script.js'
  }

};
