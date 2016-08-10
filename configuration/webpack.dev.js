const merge = require('lodash/merge')
const path = require('path')
const logger = require('debug')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.base.js')

// Merge with base configuration
//-------------------------------
merge(config, {
    cache: true,
    target: 'web',
    devtool: 'eval-source-map', // eval eval-cheap-module-source-map source-map
    entry: {
        bundle: [
            'event-source-polyfill',
            'webpack-hot-middleware/client?reload=true&path=http://localhost:2002/__webpack_hmr',
            path.join(__dirname, '../src/client/client.js')
        ]
    },
    output: {
        publicPath: 'http://localhost:2002/build/',
        libraryTarget: 'var',
        pathinfo: true
    }
})

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env.BLUEBIRD_WARNINGS': '0',
        'process.env.NODE_ENV': JSON.stringify('development')
    })
)

// Run DEV server for hot-reloading
//---------------------------------
const app = express()
const compiler = webpack(config)
const port = 2002
const wdm = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    stats: {
        colors: true,
        hash: false,
        timings: false,
        version: false,
        chunks: false,
        modules: false,
        children: false,
        chunkModules: false
    }
})

app.use(wdm)
app.use(webpackHotMiddleware(compiler));

// Launch DEV server
//-------------------------------
const devServer = app.listen(port, 'localhost', err => {
    if (err) return console.error(err)

    logger('server:webpack')('Running on port ' + port)
})

process.on('SIGTERM', () => {
    logger('server:webpack')('Stopping...')
    wdm.close()
    devServer.close(() => process.exit(0))
})
