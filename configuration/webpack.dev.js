const { merge } = require('lodash')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

// Merge with base configuration
//-------------------------------
merge(config, {
    cache: true,
    target: 'web',
    devtool: 'eval-source-map', // eval eval-cheap-module-source-map source-map
    entry: {
        bundle: [
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
    stats: {
        colors: true,
        chunks: false,
        modules: false
    }
})

app.use(wdm)
app.use(webpackHotMiddleware(compiler));

// Launch DEV server
//-------------------------------
const devServer = app.listen(port, 'localhost', err => {
    if (err) return console.error(err)

    console.info(`Webpack DEV Server running on port ${port}`)
})

process.on('SIGTERM', () => {
    console.info('Stopping dev server')
    wdm.close()
    devServer.close(() => process.exit(0))
})

module.exports = config
