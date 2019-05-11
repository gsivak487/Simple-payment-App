// var debug = process.env.NODE_ENV !== "production";
// var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    entry: './index.js',
    output: {
      path: __dirname + "/src/",
       filename: './client.min.js'
       },
    devServer: {
       inline: true,
       port: 8080
    },
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader : 'babel-loader',
             query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
             }
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          }
       ]
    },
    node: {
      fs: "empty"
   },
   plugins: [new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
    })],
   devServer: {
    historyApiFallback: true
}
    
 }
 module.exports = config;



//  {
//   test: /.css$/,
//   use: [
//     {
//       loader: "style-loader"
//     },
//     {
//       loader: "css-loader",
//       options: {
//         modules: true
//       }
//     }
//   ]
// }