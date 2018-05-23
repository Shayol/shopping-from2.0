const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /(index|catalog|form)\.html$/, //without this HtmlWebPackPlugin will not work with template file correctly
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ['img:src', 'source:srcset'], //allows to use picture tag
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              importLoaders: 1,
              sourceMap: true
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
          ]
        })
      },
      {
        test: /\.(eot|woff|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'index',
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin('style.css')
  ]
};