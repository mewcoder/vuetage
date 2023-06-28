const pathConfig = require('./path-config');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const {
  assetRules,
  getCssRules,
  getScssRules,
  vueRules,
  jsRules,
  tsRules
} = require('./module-rules');

const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = webpackEnv => {
  const isProd = webpackEnv === 'production';
  return {
    entry: pathConfig.appEntry, // 入口文件
    devtool: isProd ? 'hidden-source-map' : 'eval-cheap-module-source-map',
    // 输出配置
    output: {
      path: pathConfig.appOutput,
      publicPath: pathConfig.publicPath, //todo
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      hashFunction: 'xxhash64', // 从 webpack v5.54.0+ 起，hashFunction 支持将 xxhash64 作为更快的算法，当启用 experiments.futureDefaults 时，此算法将被默认使用。
      clean: isProd // 清除 dist 目录， 代替 clean-webpack-plugin
    },
    resolve: {
      extensions: pathConfig.moduleFileExtensions,
      alias: {
        '@': pathConfig.appSrc
      }
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'vue'],
        context: pathConfig.appSrc
      }),
      // todo
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(webpackEnv),
          BASE_URL: JSON.stringify('/')
        }
      }),
      new HtmlWebpackPlugin({
        template: pathConfig.appHtml
      }),
      new VueLoaderPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here http://localhost:8080']
        }
      })
    ],
    module: {
      rules: [
        ...assetRules,
        ...getCssRules(isProd),
        ...getScssRules(isProd),
        ...vueRules,
        ...jsRules,
        ...tsRules
      ]
    },
    // cache: {
    //   type: 'filesystem',
    //   allowCollectingMemory: true
    // },
    infrastructureLogging: {
      level: 'none'
    },
    stats: 'none'
  };
};
