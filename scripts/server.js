const serve = require('serve-handler');
const path = require('path');
const http = require('http');
const open = require('open');
const inform = require('./logger');

module.exports = {
  async start(options = {}) {
    const {
      open: isOpen,
      host,
      port,
      dist,
    } = options;

    const server = http.createServer((request, response) => {
      const settings = { public: path.resolve(__dirname, dist) };
      return serve(request, response, settings);
    });

    return new Promise((resolve, reject) => {
      server.listen(port, async () => {
        const url = `http://${host}:${port}`;
        inform.log(`Server listen at ${url}`);

        try {
          if (isOpen) {
            await open(url);
            resolve();
          }
        } catch (ex) {
          reject(ex);
        }
      });
    });
  },
};
