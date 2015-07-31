

export default {

  livereload: {
    files: '<%= dist %>/*',
    options: {
      livereload: true
    }
  },

  stylesheets: {
    files: '<%= src %>/stylesheets/*',
    tasks: 'less'
  }

};
