const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    // pathinfo: true,
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: './' // 静态资源文件引用时的路径（加在引用静态资源前面的）
  },
  module: {
    rules: [
      { 
        test: /\(.js)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'zbui',
      template: './index.html'
    }),
  ]
};