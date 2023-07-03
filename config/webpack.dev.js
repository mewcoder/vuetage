const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const proxy = require('./devserver-proxy');

module.exports = () => {
  return merge(baseConfig('development'), {
    mode: 'development',
    devServer: {
      client: {
        logging: 'none',
        overlay: false,
        progress: true
      },
      static: {
        directory: paths.appPublic,
        publicPath: paths.getPublicPath()
      },
      devMiddleware: {
        // remove last slash so user can land on `/test` instead of `/test/`
        publicPath: paths.getPublicPath().slice(0, -1)
      },
      // history路径在刷新出错时重定向开启
      historyApiFallback: {
        index: paths.getPublicPath()
      },
      open: [paths.getPublicPath()],
      proxy
    },
    optimization: {
      moduleIds: 'named',
      chunkIds: 'named'
    },
    stats: {
      all: false
    }
  });
};
