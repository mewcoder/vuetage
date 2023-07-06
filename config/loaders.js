const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 *
 * @param {*} type css|sass
 * @param {*} extract 分离css文件
 */
function getStyleLoaders(type, extract) {
  const cssFinalLoader = extract
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // publicPath: '/' // todo
        }
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
      loader: require.resolve('sass-loader')
    });
  }

  return rules;
}

module.exports = {
  getStyleLoaders
};
