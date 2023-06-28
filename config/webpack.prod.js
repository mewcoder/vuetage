const baseConfig = require('./webpack.base');
const paths = require('./paths');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = merge(baseConfig('production'), {
  mode: 'production',
  optimization: {
    moduleIds: 'deterministic', // 默认参数
    chunkIds: 'deterministic' // 默认参数
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: paths.appOutput,
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240
    })

    // new WebpackBar({
    //   reporters: ['profile'],
    //   profile: true
    // })
  ]
});
