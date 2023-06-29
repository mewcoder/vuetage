const paths = require('./paths');
const getRules = require('./rules');
const {
  DefinePlugin,
  ProgressPlugin,
  HtmlWebpackPlugin,
  VueLoaderPlugin,
  EsbuildPlugin,
  ESLintPlugin,
  FriendlyErrorsWebpackPlugin
} = require('./plugins');

module.exports = webpackEnv => {
  const isProd = webpackEnv === 'production';
  return {
    entry: paths.appEntry, // 入口文件
    devtool: isProd ? 'hidden-source-map' : 'eval-cheap-module-source-map',
    // 输出配置
    output: {
      path: paths.appOutput,
      publicPath: paths.publicPath, //todo
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      hashFunction: 'xxhash64', // 从 webpack v5.54.0+ 起，hashFunction 支持将 xxhash64 作为更快的算法，当启用 experiments.futureDefaults 时，此算法将被默认使用。
      clean: true // 清除 dist 目录， 代替 clean-webpack-plugin
    },
    resolve: {
      extensions: paths.moduleFileExtensions,
      alias: {
        '@': paths.appSrc
      },
      symlinks: false // 提升性能
    },
    plugins: [
      new VueLoaderPlugin(),
      new ESLintPlugin({
        extensions: ['vue', 'js', 'mjs', 'ts'],
        context: paths.appSrc,
        lintDirtyModulesOnly: !isProd
      }),
      // todo
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(webpackEnv),
          BASE_URL: JSON.stringify('/')
        }
      }),
      new HtmlWebpackPlugin({
        template: paths.appHtml
      }),
      new FriendlyErrorsWebpackPlugin(),
      new ProgressPlugin()
    ],
    module: {
      rules: getRules(isProd)
    },
    cache: {
      type: isProd ? false : 'filesystem',
      allowCollectingMemory: true
    },
    optimization: {
      realContentHash: false // true 生成正确的内容 hash，耗费性能
      // minimizer: [new EsbuildPlugin({ target: 'es2015', css: true })] // 代替terser
    },
    infrastructureLogging: {
      level: 'none'
    },
    stats: 'none'
  };
};
