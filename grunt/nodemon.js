

export default {

  dev: {

    options: {
      ignore: ['public'],
      env: {
        NODE_ENV: 'development',
        DEBUG: 'graves'
      }
    },

    exec: 'npm start'

  }

};
