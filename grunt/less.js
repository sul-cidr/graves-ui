

export default {

  options: {
    paths: 'node_modules'
  },

  dist: {
    src: '<%= src %>/stylesheets/index.less',
    dest: '<%= dist %>/style.css'
  }

};
