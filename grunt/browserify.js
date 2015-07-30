

export default {

  options: {
    watch: true,
    transform: ['babelify'],
    browserifyOptions: {
      debug: true
    }
  },

  dist: {
    src: '<%= src %>/javascripts/index.js',
    dest: '<%= dist %>/script.js'
  }

};
