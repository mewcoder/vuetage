const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const resolveApp = require('./paths');

module.exports = isProduction => {
  const cssFinalLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    entry: './src/main.js',
    output: {
      path: resolveApp('dist'),
      filename: 'js/[name].[hash:6].js',
      chunkFilename: 'js/[name].chunk.[hash:4].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json', '...'],
      alias: {
        '@': resolveApp('src')
      }
    },
    externals: {
      // 不希望依赖打进包中，走外链cdn等
      // '$': 'Jquery',
      // react: 'React',
      // 'react-dom': 'ReactDOM',
      // 'prop-types': 'PropTypes',
      // moment: 'moment',
      // antd: 'antd',
      // classnames: 'classNames',
    },
    module: {
      rules: [
        // vue文件处理
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        // css文件处理
        {
          test: /\.css$/,
          use: [
            cssFinalLoader, // 最终要以style标签输出到页面
            {
              loader: 'css-loader',
              options: {
                esModule: false, // css不使用esModule，直接输出
                importLoaders: 1 // 使用本loader前使用1个其他处理器
              }
            },
            'postcss-loader'
          ],
          sideEffects: true // 希望保留副作用
        },
        // 图片类处理
        {
          test: /\.(png|gif|jpe?g|svg)$/,
          type: 'asset', // webpack5使用内置静态资源模块，且不指定具体，根据以下规则 使用
          generator: {
            filename: 'img/[name].[hash:6][ext]' // ext本身会附带 点，放入img目录下
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024 // 超过10kb的进行复制，不超过则直接使用base64
            }
          }
        },
        // 字体类处理
        {
          test: /\.(ttf|woff2?|eot)$/,
          type: 'asset/resource', // 指定静态资源类复制
          generator: {
            filename: 'font/[name].[hash:6][ext]' // 放入font目录下
          }
        },
        {
          test: /\.(vue|js)$/,
          use: 'eslint-loader',
          exclude: /node_modules/,
          enforce: 'pre'
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        BASE_URL: '"./"'
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new VueLoaderPlugin()
    ],
    optimization: {
      runtimeChunk: true, // 模块抽取，利用浏览器缓存
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false // 不要注释生成的文件
        })
      ]
    }
  };
};
