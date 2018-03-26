const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    rules: [
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
            ["babel-plugin-inferno", {"imports": true}],
            "add-module-exports",
            "transform-decorators-legacy",
            "transform-object-rest-spread",
            "transform-class-properties",
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ],
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
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      allChunks: false
    })
  ]
};
