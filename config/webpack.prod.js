const paths = require('./paths');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const {
  CopyPlugin,
  MiniCssExtractPlugin,
  CompressionPlugin,
  EsbuildPlugin,
  WriteHashPlugin,
  BundleAnalyzerPlugin
} = require('./plugins');
const { genAssetPath } = require('./utils');

module.exports = () => {
  return merge(baseConfig('production'), {
    mode: 'production',
    optimization: {
      minimizer: [new EsbuildPlugin({ css: true })], // 代替terser
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
      new WriteHashPlugin(),
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
        filename: genAssetPath('css', true),
        chunkFilename: genAssetPath('css', true)
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        threshold: 10240
      })
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   openAnalyzer: false,
      //   logLevel: 'warn'
      // })
    ],
    stats: {
      all: false,
      // 生成资源信息
      assets: true,
      cachedAssets: true,
      assetsSpace: 100,
      assetsSort: 'chunks',
      version: true
    }
  });
};
