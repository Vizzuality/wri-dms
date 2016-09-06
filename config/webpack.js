/* eslint-env node */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const rootPath = process.cwd();
require('dotenv').config({
  silent: true,
});


const webpackConfig = {
  entry: [
    'whatwg-fetch',
    './src/index.jsx',
  ],
  devtool: 'source-map',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: 'html/template.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
      VERSION: JSON.stringify(require('../package.json').version),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  output: {
    path: 'dist',
    filename: '[name].bundle.js',
  },
  // this section allows imports with absolute paths (as if usiong node_modules)
  resolve: {
    root: [
      rootPath,
    ],
    alias: {
      actions: 'src/actions',
      actionNames: 'src/actionNames',
      reducers: 'src/reducers',
      style: 'styles',
      components: 'src/components',
      containers: 'src/containers',
      utils: 'src/utils',
      constants: 'src/constants',
    },
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'eslint-loader'],
    }],
  },
  postcss: function () {
    return [autoprefixer];
  },
};


// Environment configuration
if (process.env.NODE_ENV === 'production') {
  // Loaders
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(['css', 'sass']),
  });
  webpackConfig.module.loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(['css']),
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=[hash].[ext]',
      'image-webpack?{progressive:true, optimizationLevel: 7,' +
      ' interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
    ],
  });
  // Plugins
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true,
    },
    comments: false,
  }));
  webpackConfig.plugins.push(new ExtractTextPlugin('styles-[hash].css'));
} else {
  // Activating source map
  webpackConfig.devtool = 'source-map';
  // Loaders
  webpackConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css'],
  });
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'postcss', 'sass'],
  });
  webpackConfig.module.loaders.push({
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: ['file?name=[path][name].[ext]'],
  });
}

module.exports = webpackConfig;
