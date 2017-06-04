/* eslint-disable no-var, strict */
'use strict';
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  var plugins = [
    new webpack.DefinePlugin({
      __IN_DEBUG__: false,
      __VERSION__: JSON.stringify('tests'),
      __CONNECTION_URL__: JSON.stringify('http://localhost:7778/')
    })
  ].concat(webpackConfig.plugins);

  // https://github.com/webpack-contrib/karma-webpack/issues/24#issuecomment-257613167
  var commonsChunkPluginIndex = plugins.findIndex(plugin => plugin.chunkNames);
  plugins.splice(commonsChunkPluginIndex, 1);

  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: ['PhantomJS'],

    files: [
      // This ensures we have the es6 shims in place
      // and then loads all the tests
      'test/main.js'
    ],

    port: 9876,

    frameworks: ['jasmine'],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'test/main.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: plugins
    },

    webpackMiddleware: {
      quiet: true,
      stats: {
        colors: true
      }
    },

    // reporter options
    mochaReporter: {
      colors: {
        success: 'bgGreen',
        info: 'cyan',
        warning: 'bgBlue',
        error: 'bgRed'
      }
    },

    notifyReporter: {
      reportSuccess: false // Default: true, Will notify when a suite was successful
    },

    junitReporter: {
      outputDir: 'reports/test', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''
    }
  });
};
