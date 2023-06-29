const paths = require('./paths');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CopyPlugin, MiniCssExtractPlugin, CompressionPlugin, EsbuildPlugin } = require('./plugins');

module.exports = merge(baseConfig('production'), {
  mode: 'production',
  optimization: {
    moduleIds: 'deterministic', // 默认参数
    chunkIds: 'deterministic', // 默认参数
    minimizer: [new EsbuildPlugin({ target: 'es2015', css: true })], // 代替terser
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
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
  ]
});
