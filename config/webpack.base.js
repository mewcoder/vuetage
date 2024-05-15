const { getClientEnv } = require('./env');
const { getRules } = require('./rules');
const {
  DefinePlugin,
  ProvidePlugin,
  HtmlWebpackPlugin,
  VueLoaderPlugin,
  ESLintPlugin,
  FriendlyErrorsWebpackPlugin,
  IgnorePlugin,
  CaseSensitivePathsPlugin
} = require('./plugins');
const paths = require('./paths');
const { genAssetPath } = require('./utils');

module.exports = webpackEnv => {
  const isProd = webpackEnv === 'production';
  return {
    entry: paths.appEntry, // 入口文件
    // https://github.com/vuejs/vue/issues/12689   部分 vue 文件 source-map 可能会定位不准,修改 vue-loader 源码，使用 patch-package 解决
    devtool: isProd ? false : 'eval-cheap-module-source-map',
    target: 'web', // https://github.com/vuejs/vue-loader/issues/1795
    // 输出配置
    output: {
      path: paths.appOutput,
      publicPath: paths.getPublicPath(),
      filename: genAssetPath('js', isProd),
      chunkFilename: genAssetPath('js', isProd),
      hashFunction: 'xxhash64', // 从 webpack v5.54.0+ 起，hashFunction 支持将 xxhash64 作为更快的算法，当启用 experiments.futureDefaults 时，此算法将被默认使用。
      clean: true // 清除 dist 目录， 代替 clean-webpack-plugin
    },
    resolve: {
      extensions: paths.moduleFileExtensions,
      alias: {
        '@': paths.appSrc,
        vue$: 'vue/dist/vue.esm.js' // fix:$attrs is readonly / $listeners is readonly
      },
      symlinks: false // 提升性能
    },
    plugins: [
      new VueLoaderPlugin(),
      new ESLintPlugin({
        extensions: ['vue', 'js', 'mjs', 'ts'],
        context: paths.appSrc,
        cache: !isProd,
        emitWarning: true,
        failOnError: false,
        lintDirtyModulesOnly: !isProd
      }),
      new DefinePlugin(getClientEnv()),
      new HtmlWebpackPlugin({
        title: paths.appTitle,
        template: paths.appHtml,
        filename: 'index.html',
        templateParameters: getClientEnv(true)
      }),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: false
      }),
      new ProvidePlugin({
        process: 'process/browser' // fix: Uncaught ReferenceError: process is not defined
      }),
      new IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new CaseSensitivePathsPlugin()
    ],
    module: {
      noParse: /^(vue|vue-router|pinia|vue-i18n|axios)$/,
      rules: getRules(isProd)
    },
    performance: false
  };
};
