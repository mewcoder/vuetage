const baseConfig = require("./webpack.base");
const { merge } = require('webpack-merge')
module.exports = merge(baseConfig("production"), {
  mode: "production",
  optimization: {
    moduleIds: "deterministic", // 默认参数
    chunkIds: "deterministic", // 默认参数
  },
});
