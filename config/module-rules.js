const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    type: 'asset', // file-loader - {limit} - url-loader
    generator: {
      filename: 'img/[name].[hash:8][ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1024 * 4
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
]

const getCssLoaders = isProd => {
  const cssFinalLoader = isProd ? MiniCssExtractPlugin.loader : require.resolve('style-loader')

  return [
    cssFinalLoader,
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 2
      }
    },
    {
      // todo
      loader: require.resolve('postcss-loader')
    }
  ]
}

/* css */
const getCssRules = isProd => {
  return [
    {
      test: /\.css$/,
      use: getCssLoaders(isProd)
    }
  ]
}

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
  ]
}

/* vue */
const vueRules = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: require.resolve('vue-loader')
      }
    ]
  }
]

/* js */

const jsRules = [
  {
    test: /\.js$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'js',
      target: 'es2015'
    }
  }
]

/* ts */
const tsRules = [
  {
    test: /\.ts$/,
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'ts'
    }
  }
]

module.exports = {
  assetRules,
  getCssRules,
  getScssRules,
  vueRules,
  jsRules,
  tsRules
}
