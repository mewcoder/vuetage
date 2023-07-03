const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const { getRouter, getReq } = require('./proxy');

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
        publicPath: paths.getPublicPath()
      },
      compress: true, // gzip压缩
      // history路径在刷新出错时重定向开启
      historyApiFallback: {
        index: paths.getPublicPath() + 'index.html'
      },
      // open: [paths.getPublicPath()],
      proxy: {
        '/api': {
          target: 'http://api.github.com',
          changeOrigin: true,
          secure: false,
          router: getRouter,
          onProxyReq: getReq
          // pathRewrite: {
          //   '/api': ''
          // }
        }
      }
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
