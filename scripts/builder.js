const webpack = require('webpack');
const open = require('open');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigBuilder = require('./webpack.config');
const inform = require('./logger');
const server = require('./server');

const devServer = (options = {}) => {
  const { open: isOpen, host, port } = options;
  const url = `http://${host}:${port}`;
  const config = webpackConfigBuilder({ dev: true });
  const compiller = webpack(config);
  const webpackDevServer = new WebpackDevServer(compiller, config.devServer);

  return new Promise((resolve, reject) => {
    webpackDevServer.listen(port, host, async () => {
      inform.log(`Dev server has started at ${url} successfully.`);

      if (isOpen) {
        try {
          inform.log('Opening page...');
          await open(url);
          inform.log('Enjoy!');
        } catch (ex) {
          reject(ex);
        }
      }
      resolve();
    });
  });
};

const build = async (options = {}) => {
  const { open: isOpen } = options;
  const config = webpackConfigBuilder({ dev: false });
  const compiller = webpack(config);

  return new Promise((resolve, reject) => {
    compiller.run(async (error, stats) => {
      const errorMessage = 'Something went wrong while building the project...';
      const hasErrors = error || stats.hasErrors();

      if (hasErrors) {
        inform.error(error || stats.hasErrors());
        reject(new Error(errorMessage));
        return;
      }
      inform.log('Compilation finished successfully.');

      try {
        if (isOpen) {
          await server.start(options);
        }
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  });
};

module.exports = { devServer, build };
