

import fs from 'fs';


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

          // When nodemon restarts, wait 500ms and then touch a .reboot file,
          // which will trigger a reload.
          setTimeout(() => {
            fs.writeFileSync('public/dist/.reboot', Date.now());
          }, 500);

        });
      }

    },

    exec: 'npm start'

  }

};
