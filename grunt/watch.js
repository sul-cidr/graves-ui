

export default {

  livereload: {
    files: '<%= dist %>/*',
    options: {
      livereload: true,
      dot: true
    }
  },

  stylesheets: {
    files: '<%= src %>/stylesheets/*.less',
    tasks: 'less'
  }

};
