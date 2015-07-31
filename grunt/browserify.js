

export default {

  options: {
    watch: true,
    transform: ['babelify', 'yamlify'],
    browserifyOptions: {
      debug: true
    }
  },

  dist: {
    src: '<%= src %>/javascripts/index.js',
    dest: '<%= dist %>/script.js'
  }

};
