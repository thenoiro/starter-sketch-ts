const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isChild = Boolean(module.parent);
const resolveAll = (pathes) => pathes.map((p) => path.resolve(__dirname, p));

const configBuilder = (options = {}) => {
  const { dev = false } = options;

  return {
    mode: dev ? 'development' : 'production',
    entry: path.resolve(__dirname, '../src/ts/index.ts'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: resolveAll([
          '../src/manifest.webmanifest',
          '../src/favicon.ico',
          '../src/favicon-16x16.png',
          '../src/favicon-32x32.png',
          '../src/apple-touch-icon.png',
          '../src/android-chrome-512x512.png',
          '../src/android-chrome-192x192.png',
        ]),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        minify: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
              },
            },
            'css-loader',
          ],
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: '/node_modules/',
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      watchOptions: {
        poll: true,
      },
    },
  };
};

module.exports = isChild ? configBuilder : configBuilder();
