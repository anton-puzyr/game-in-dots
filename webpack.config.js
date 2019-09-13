const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader'],
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      template: './public/index.html',
    }),
    new Dotenv(),
  ],
};
