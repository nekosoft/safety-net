import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

import { WDS_PORT, APP_NAME, APP_CONTAINER_CLASS } from './src/app/config';
import { isProd } from './src/app/util';

const ExtractTextPluginConfig = new ExtractTextPlugin({ // define where to save the file
  filename: isProd ? '[name].[hash].css' : '[name].css',
  allChunks: true,
});


export default {
  mode: isProd ? 'production' : 'development',
  entry: {
      index: './src/index',
  },
  output: {
    filename: isProd ? '[name].[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
    optimization: {
      splitChunks: {
          chunks: 'all'
      }
    },
  module: {
    rules: [
//       { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(js|jsx)$/, use: { loader: 'babel-loader', options: { presets: [ 'env' ] } }, exclude: /node_modules/ },
      { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] }) },
      { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|woff2?)$/, loader: 'file-loader' },
      { test: /\.(md?)$/, loader: 'raw-loader' },
    ],
  },
    devtool: isProd ? false : 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
      alias: {
          Components: path.resolve(__dirname, 'src/app/components/'),
          Utils: path.resolve(__dirname, 'src/app/utils/'),
          App: path.resolve(__dirname, 'src/app/'),
          Assets: path.resolve(__dirname, 'src/assets/')
      }
  },
  devServer: {
    port: WDS_PORT,
      historyApiFallback: true,
  },
  plugins: [
      ExtractTextPluginConfig,
      new HtmlWebpackPlugin({
        title: APP_NAME,
        app: APP_CONTAINER_CLASS,
          isProd: isProd,
        template: 'src/template/index.html.ejs',
        filename: 'index.html',
        favicon: 'src/favicon.png',
        minify: {},
      }),
//       new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin(),
  ],
}
