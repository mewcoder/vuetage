const { getClientEnv } = require('./env');
const getRules = require('./rules');
const {
  DefinePlugin,
  ProgressPlugin,
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
    devtool: isProd ? 'hidden-source-map' : 'eval-cheap-module-source-map',
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
        lintDirtyModulesOnly: !isProd
      }),
      new DefinePlugin(getClientEnv()),
      new HtmlWebpackPlugin({
        title: paths.appTitle,
        template: paths.appHtml,
        filename: 'index.html',
        templateParameters: getClientEnv(true)
      }),
      new FriendlyErrorsWebpackPlugin(),
      new ProgressPlugin(),
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
      rules: getRules(isProd)
    },
    optimization: {
      realContentHash: false // true 生成正确的内容 hash，耗费性能
    },
    performance: false
  };
};
