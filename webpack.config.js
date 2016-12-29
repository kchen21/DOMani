const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/main.js',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'DOMani.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
