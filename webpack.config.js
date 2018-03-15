/* eslint-disable import/no-commonjs */

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};

/* eslint-enable import/no-commonjs */
