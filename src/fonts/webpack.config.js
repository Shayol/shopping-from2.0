const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
      path: __dirname + '/dist',
      filename: 'script.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.(svg|gif|png|eot|woff|ttf)$/,
          use: [
            'url-loader'
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new LiveReloadPlugin()
    ]
  };