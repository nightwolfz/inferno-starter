const path = require('path')
const ExtractCSS = require('extract-text-webpack-plugin')
const root = path.join.bind(path, __dirname)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {},
  node: {
    global: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  performance: {
    hints: false
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          root('src'),
          root('core')
        ],
        query: {
          cacheDirectory: false,
          presets: [],
          plugins: [
            "add-module-exports",
            "transform-object-rest-spread",
            "transform-decorators-legacy",
            "transform-class-properties",
            "inferno"
          ]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader?limit=100000',
        include: [
          root('src/assets'),
          root('src/client/components')
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff2?)$/,
        use: 'file-loader',
        include: [
          root('src/assets'),
          root('src/client/components')
        ]
      },
      {
        test: /\.(css|scss)?$/,
        use: ExtractCSS.extract(['css-loader?sourceMap', 'sass-loader?sourceMap']),
        include: [
          root('src/assets'),
          root('src/components')
        ]
      }
    ]
  },

  output: {
    filename: 'bundle.js',
    path: root('build'),
    sourcePrefix: '',
  },

  resolve: {
    alias: {
      'core': root('core')
    },
  },

  plugins: [
    new ExtractCSS({
      filename: 'bundle.css',
      allChunks: false
    })
  ]
};
