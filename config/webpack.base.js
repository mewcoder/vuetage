const path = require("path");
const pathConfig = require("./path-config");

module.exports = (webpackEnv) => {
  const isProd = webpackEnv === "production";
  return {
    entry: pathConfig.appEntry, // 入口文件
    devtool: isProd ? "hidden-source-map" : "cheap-module-eval-source-map",
    // 输出配置
    output: {
      path: pathConfig.appOutput,
      publicPath: pathConfig.publicPath, //todo
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].js",
      chunkFilename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].js",
      hashFunction: "xxhash64", // 从 webpack v5.54.0+ 起，hashFunction 支持将 xxhash64 作为更快的算法，当启用 experiments.futureDefaults 时，此算法将被默认使用。
      clean: isProd, // 清除 dist 目录， 代替 clean-webpack-plugin
    },
    resolve: {
      extensions: pathConfig.moduleFileExtensions,
      alias: {
        "@": pathConfig.appSrc,
      },
    },
  };
};
