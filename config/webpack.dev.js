const baseConfig = require('./webpack.common')
const { merge } = require('webpack-merge')
module.exports = merge(baseConfig(false), {
  mode: 'development',
  target: 'web',
  devServer: {
    hot: 'only',
    port: 8080, // 端口号，工作中从3001开始，因此增加1个到3002
    open: false, // 自动打开浏览器
    compress: true, // 开启gzip压缩
    historyApiFallback: true // history路径在刷新出错时重定向开启
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
    chunkIds: 'named'
  }
})
