/* eslint-disable import/no-commonjs */

const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config');

const clientConfig = merge(config, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  }
});

const serverConfig = merge(config, {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.node.js',
    libraryTarget: 'commonjs2'
  }
});


module.exports = [ serverConfig, clientConfig ];
/* eslint-enable import/no-commonjs */
