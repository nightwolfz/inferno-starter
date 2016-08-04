const { merge } = require('lodash')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.js')

// Merge with base configuration
//-------------------------------
merge(config, {
    cache: false,
    target: 'web',
    devtool: 'source-map',
    entry: {
        bundle: path.join(__dirname, '../src/client/client.js')
    },
    output: {
        publicPath: 'http://localhost:2000/build/',
        libraryTarget: 'var'
    }
})

console.info('Running production build...')

delete config.output.libraryTarget
delete config.output.pathinfo

// Save files to disk
//-------------------------------
//config.output.path = path.join(__dirname, '../build')
config.plugins.push(
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.UglifyJsPlugin({
    compressor: {
        screw_ie8: true,
        warnings: false
    }
}))

// Set some environment variables
//-------------------------------
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env.BLUEBIRD_WARNINGS': '0',
        'process.env.NODE_ENV': JSON.stringify('production')
    })
)

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
    throw new Error('Using "eval" source-maps may break the build')
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config)
compiler.run(function(err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
        colors: true,
        hash: false,
        chunks: false,
        version: false,
        chunkModules: false
    }))

    if (stats.hasErrors()) {
        console.warn('Finished compiling webpack with errors...')
        console.warn(stats.compilation.errors.toString())
    } else {
        console.info('Finished compiling webpack')
    }
})

module.exports = config
