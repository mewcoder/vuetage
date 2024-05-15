const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 *
 * @param {*} type css|sass
 * @param {*} extract 分离css文件
 * @param {*} preOptions 变量
 * @param {*} sourceMap 默认关闭，开启后F12调试样式很有问题
 */

function getStyleLoaders(type, extract, preOptions = {}) {
  const cssFinalLoader = extract
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {}
      }
    : {
        loader: require.resolve('vue-style-loader'),
        options: {}
      };

  const rules = [
    cssFinalLoader,
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 2
      }
    },
    {
      loader: require.resolve('postcss-loader'), // 配置在 postcss.config.js
      options: {}
    }
  ];

  if (type === 'scss') {
    rules.push({
      loader: require.resolve('sass-loader'),
      options: { ...preOptions }
    });
  }

  return rules;
}

module.exports = {
  getStyleLoaders
};
