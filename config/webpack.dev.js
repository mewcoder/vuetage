const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
module.exports = merge(baseConfig('development'), {
  mode: 'development',
  devServer: {
    client: {
      logging: 'none',
      overlay: {
        errors: true,
        warnings: false
      },
      progress: true
    },

    compress: true, // gzip压缩
    historyApiFallback: true // history路径在刷新出错时重定向开启
    // open: true,
    // static: 管理静态资源
    // proxy: { // 接口代理
    //   '/api': { // 统一api前缀都代理掉
    //     target: 'http://api.github.com', // 代理的目标地址
    //     changeOrigin: true, // 改变来源信息
    //     pathRewrite: { // 因前缀为自己增加，因此重写地址
    //       '/api': '' // 将前缀去掉
    //     }
    //   }
    // }
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named'
  },
  stats: {
    all: false
  }
});
