const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');

rules.push({
  test: /\.s[ac]ss$/i,
  use: ['style-loader', 'css-loader', 'sass-loader'],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    alias: {
      '@src': path.join(__dirname, './src'),
    },
  },
};

