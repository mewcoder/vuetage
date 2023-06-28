const baseConfig = require("./webpack.base");
const pathConfig = require("./path-config");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(baseConfig("production"), {
  mode: "production",
  optimization: {
    moduleIds: "deterministic", // 默认参数
    chunkIds: "deterministic", // 默认参数
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: pathConfig.appPublic,
          to: pathConfig.appOutput,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ],
});
