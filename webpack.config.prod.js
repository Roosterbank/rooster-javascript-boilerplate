/* eslint-disable import/no-commonjs */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});

/* eslint-enable import/no-commonjs */
