const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const proxy = require('./devserver-proxy');
const { LogServerAddress, WebpackBar } = require('./plugins');

let port = 8080;

const getPort = () => port;

module.exports = () => {
  return merge(baseConfig('development'), {
    mode: 'development',
    devServer: {
      client: {
        logging: 'none',
        overlay: false,
        progress: false
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
      open: false,
      proxy,
      onListening: devServer => {
        if (!devServer) return;
        port = devServer.server.address().port;
      }
    },
    plugins: [new LogServerAddress(getPort), new WebpackBar()],
    cache: {
      type: 'filesystem'
    },
    infrastructureLogging: {
      level: 'none' // 关闭日志
    },
    stats: {
      all: false
    }
  });
};
