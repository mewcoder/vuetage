const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 *
 * @param {*} type css|sass
 * @param {*} extract 分离css文件
 * @param {*} options
 */
function getStyleLoaders(type, extract, options) {
  const cssFinalLoader = extract
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // publicPath: '/' // todo
        }
      }
    : {
        loader: require.resolve('vue-style-loader'),
        options: {
          sourceMap: false
        }
      };

  const rules = [
    cssFinalLoader,
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: false,
        importLoaders: 2
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: false
      }
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
