const path = require('path')
const webpack = require('webpack')
const ExtractCSS = require('extract-text-webpack-plugin')
const sources = (location) => path.join(__dirname, '../../src', location)

module.exports = {
    entry: {},
    performance: {
        hints: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [sources(''), sources('../core')],
                query: {
                    cacheDirectory: false,
                    presets: [],
                    plugins: [
                        "add-module-exports",
                        "transform-es2015-modules-commonjs",
                        "transform-es2015-destructuring",
                        "transform-object-rest-spread",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "inferno",
                        ["fast-async"]
                    ]
                }
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css-loader?sourceMap', 'sass-loader?sourceMap']),
                include: [sources('assets'), sources('client/components')]
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        sourcePrefix: '',
        path: path.resolve(__dirname, '../../build')
    },

    resolve: {
        alias: {
            'core': path.join(__dirname, '../')
        }
    },

    plugins: []
};
