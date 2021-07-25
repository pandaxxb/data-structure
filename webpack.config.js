const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  mode: 'none',
  devServer: {
    hot: true,
    contentBase: './dist',
  }
}