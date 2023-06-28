const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 *  配置loader
 */

/* 静态资源 */
const assetRules = [
  // svg
  {
    test: /\.(svg)(\?.*)?$/,
    type: 'asset/resource', // file-loader
    generator: {
      filename: 'img/[name].[hash:8][ext]'
    }
  },
  // images
  {
    test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
    type: 'asset', // file-loader - {maxSize} - url-loader
    generator: {
      filename: 'img/[name].[hash:8][ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1024 * 4 // 4KB
      }
    }
  },
  // media
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    type: 'asset',
    generator: {
      filename: 'media/[name].[hash:8][ext]'
    }
  },
  // fonts
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset',
    generator: {
      filename: 'fonts/[name].[hash:8][ext]'
    }
  }
];

const getCssLoaders = shouldExtract => {
  const cssFinalLoader = shouldExtract
    ? { loader: MiniCssExtractPlugin.loader }
    : {
        loader: require.resolve('vue-style-loader'),
        options: {
          sourceMap: false
        }
      };

  return [
    cssFinalLoader,
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: false,
        importLoaders: 2
      }
    },
    {
      // todo autoprefixer
      loader: require.resolve('postcss-loader')
    }
  ];
};

/* css */
const getCssRules = isProd => {
  return [
    {
      test: /\.css$/,
      use: getCssLoaders(isProd)
    }
  ];
};

/* scss */
const getScssRules = isProd => {
  return [
    {
      test: /\.scss$/,
      use: [
        ...getCssLoaders(isProd),
        {
          loader: require.resolve('sass-loader')
        }
      ]
    }
  ];
};

/* vue */
const vueRules = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: require.resolve('vue-loader'),
        options: {
          compilerOptions: {
            whitespace: 'condense' // 收缩模板中的空白字符
          }
        }
      },
      // https://github.com/vuejs/vue-loader/issues/1435#issuecomment-869074949
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      }
    ]
  }
];

/* js */

const jsRules = [
  {
    test: /\.js$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'js'
    }
  }
];

/* ts */
const tsRules = [
  {
    test: /\.ts$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'ts'
    }
  }
];

function getRules(isProd) {
  return [
    ...assetRules,
    ...getCssRules(isProd),
    ...getScssRules(isProd),
    ...vueRules,
    ...jsRules,
    ...tsRules
  ];
}

module.exports = getRules;
