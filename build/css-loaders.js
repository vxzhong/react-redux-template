var ExtractTextPlugin = require('extract-text-webpack-plugin')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')

module.exports = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      if (/postcss/.test(loader)) {
        return loader
      } else {
        return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
      }
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('style-loader', sourceLoader)
    } else {
      return ['style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    loaders: [
      {
        test: function (filePath) {
          return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
        },
        loader: generateLoaders(['css', 'postcss'])
      },
      {
        test: /\.module\.css$/,
        loader: generateLoaders(['css?modules&localIdentName=[local]___[hash:base64:5]', 'postcss'])
      },
      {
        test: function (filePath) {
          return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath)
        },
        loader: generateLoaders(['css', 'postcss', 'less'])
      },
      {
        test: /\.module\.less$/,
        loader: generateLoaders(['css?modules&localIdentName=[local]___[hash:base64:5]', 'postcss', 'less'])
      },
      {
        test: function (filePath) {
          return /\.s(c|a)ss$/.test(filePath) && !/\.module\.s(c|a)ss$/.test(filePath)
        },
        loader: generateLoaders(['css', 'postcss', 'sass'])
      },
      {
        test: /\.module\.s(c|a)ss$/,
        loader: generateLoaders(['css?modules&localIdentName=[local]___[hash:base64:5]', 'postcss', 'sass'])
      },
      {
        test: /\.stylus$/,
        loader: generateLoaders(['css', 'postcss', 'stylus'])
      },
      {
        test: /\.styl$/,
        loader: generateLoaders(['css', 'postcss', 'stylus'])
      }
    ],
    postcss: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
      })
    ]
  }
}
