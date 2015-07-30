

export default {

  options: {
    paths: 'node_modules',
    sourceMap: true,
    sourceMapFilename: '<%= dist %>/style.map',
    sourceMapURL: 'style.map',
  },

  dist: {
    src: '<%= src %>/stylesheets/index.less',
    dest: '<%= dist %>/style.css'
  }

};
