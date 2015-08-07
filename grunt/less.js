

export default {

  options: {
    paths: [
      'node_modules',
      'bower_components'
    ]
  },

  dist: {
    src: '<%= src %>/stylesheets/index.less',
    dest: '<%= dist %>/style.css'
  }

};
