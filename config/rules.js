const path = require('path');
const { getStyleLoaders } = require('./loaders');
const { genAssetPath, resolveApp } = require('./utils');

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
const getScssRules = (isProd, preOptions = {}) => {
  return [
    {
      test: /\.scss$/,
      use: getStyleLoaders('scss', isProd, preOptions),
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

const browserTarget = 'chrome73';

// const transpileDependencies = //;

// 返回 true 过滤
const jsExclude = filepath => {
  if (!filepath) return false;
  if (/\.vue\.jsx?$/.test(filepath)) return true;
  // if (transpileDependencies.test(filepath)) return false;
  return /node_modules/.test(filepath);
};

/* js */
const getJsRules = isProd => [
  {
    test: /\.m?js$/,
    loader: require.resolve('esbuild-loader'),
    include: [resolveApp('src')],
    exclude: jsExclude,
    options: {
      loader: 'js',
      target: isProd ? browserTarget : 'esnext'
    }
  }
];

/* ts */
const getTsRules = isProd => [
  {
    test: /\.ts$/,
    loader: require.resolve('esbuild-loader'),
    include: [resolveApp('src')],
    exclude: /node_modules/,
    options: {
      loader: 'ts',
      target: isProd ? browserTarget : 'esnext'
    }
  }
];

function getRules(isProd) {
  return [
    ...getVueRules(),
    ...getAssetRules(),
    ...getCssRules(isProd),
    ...getScssRules(isProd),
    ...getJsRules(isProd),
    ...getTsRules(isProd)
  ];
}

function getStyleRules(isProd, preOptions) {
  return [
    ...getAssetRules(),
    ...getCssRules(isProd),
    ...getScssRules(isProd, preOptions)
  ];
}

module.exports = { getRules, getStyleRules };
