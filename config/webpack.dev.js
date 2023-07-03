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
      // history路径在刷新出错时重定向开启
      historyApiFallback: {
        index: paths.getPublicPath(),
        // https://github.com/facebook/create-react-app/issues/387.
        disableDotRule: true
      },
      // open: [paths.getPublicPath()],
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
