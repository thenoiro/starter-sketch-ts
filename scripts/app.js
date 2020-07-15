require('dotenv').config();
const inform = require('./logger');
const server = require('./server');
const builder = require('./builder');

const { argv, env } = process;
const isDev = argv.includes('--dev');
const isOpen = argv.includes('--open');
const isBuild = argv.includes('--build');
const isStart = !isDev && !isBuild;

const { APP_HOST, APP_PORT } = env;

module.exports = async () => {
  const options = {
    dist: '../dist',
    open: isOpen,
    host: APP_HOST,
    port: APP_PORT,
  };
  inform.log('Running...');

  try {
    if (isStart) {
      server.start(options);
    } else if (isDev) {
      await builder.devServer(options);
    } else if (isBuild) {
      await builder.build(options);
    }
    inform.log('Done');
  } catch (ex) {
    inform.error(ex);
  }
};
