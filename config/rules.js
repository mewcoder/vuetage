const { getStyleLoaders } = require('./loaders');
const { genAssetPath } = require('./utils');
/**
 *  配置rules & loaders
 */

/* 静态资源 */
const getAssetRules = () => [
  // svg
  {
    test: /\.(svg)(\?.*)?$/,
    oneOf: [
      {
        resourceQuery: /raw/,
        type: 'asset/source' // raw-loader
      },
      {
        type: 'asset/resource', // file-loader
        generator: {
          filename: genAssetPath('img')
        }
      }
    ]
  },
  // images
  {
    test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
    type: 'asset', // file-loader - {maxSize} - url-loader
    generator: {
      filename: genAssetPath('img')
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
      filename: genAssetPath('media')
    }
  },
  // fonts
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset',
    generator: {
      filename: genAssetPath('fonts')
    }
  }
];

/* css */
const getCssRules = isProd => {
  return [
    {
      test: /\.css$/,
      use: getStyleLoaders('css', isProd),
      sideEffects: true
    }
  ];
};

/* scss */
const getScssRules = isProd => {
  return [
    {
      test: /\.scss$/,
      use: getStyleLoaders('scss', isProd),
      sideEffects: true
    }
  ];
};

/* vue */
const getVueRules = () => [
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
      }
    ]
  },
  // for vue-style: https://github.com/vuejs/vue-loader/issues/1435#issuecomment-869074949
  {
    test: /\.vue$/,
    resourceQuery: /type=style/,
    sideEffects: true
  }
];

/* js */
const getJsRules = () => [
  {
    test: /\.m?js$/,
    loader: require.resolve('esbuild-loader'),
    exclude: /node_modules/,
    options: {
      loader: 'js'
    }
  },
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  }
];

/* ts */
const getTsRules = () => [
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
    ...getVueRules(),
    ...getAssetRules(),
    ...getCssRules(isProd),
    ...getScssRules(isProd),
    ...getJsRules(),
    ...getTsRules()
  ];
}

module.exports = getRules;
