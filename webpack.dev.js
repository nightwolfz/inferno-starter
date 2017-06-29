const path = require('path')
const logger = require('debug')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  cache: true,
  devtool: 'source-map', // eval eval-cheap-module-source-map source-map
  entry: {
    bundle: [
      `webpack-dev-server/client?http://localhost:2001`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, 'src/client/client.js')
    ]
  },
  output: Object.assign(config.output, {
    publicPath: `http://localhost:2001/build/`,
    libraryTarget: 'var',
    pathinfo: true
  })
})

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.WatchIgnorePlugin([
    path.join(__dirname, '../../node_modules'),
    path.join(__dirname, '../../migrations'),
    path.join(__dirname, '../../server')
  ]),
  new webpack.DefinePlugin({
    'process.env.DEV': true,
    'process.env.BROWSER': true,
    'process.env.NODE_ENV': JSON.stringify('development')
  })
])

// Run DEV server for hot-reloading
//---------------------------------
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
  }, //hot: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }
}).listen(2001, 'localhost', function(err) {
  if (err) return logger('webpack:error', err)

  logger('webpack:compiler')('Running on port 2001')
})
