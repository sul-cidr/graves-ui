

export default {

  livereload: {
    files: '<%= dist %>/*',
    options: {
      livereload: true
    }
  },

  stylesheets: {
    files: '<%= src %>/stylesheets/*.less',
    tasks: 'less'
  }

};
