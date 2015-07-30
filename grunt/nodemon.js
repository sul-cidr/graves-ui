

export default {

  dev: {

    options: {

      ignore: ['public'],

      env: {
        NODE_ENV: 'development',
        DEBUG: 'graves'
      },

      callback: (nodemon) => {
        nodemon.on('restart', () => {
          console.log('restart');
        });
      }

    },

    exec: 'npm start'

  }

};
