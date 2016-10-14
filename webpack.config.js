var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");


var config = {
    devtool: "source-map",
    entry: {
        index: "./index"
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.(es6|js)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file',
                query: {
                    mimetype: 'application/font-woff',
                    limit: 50000,
                    name: './fonts/[hash].[ext]'
                }
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    name: './fonts/[hash].[ext]'
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    name: './fonts/[hash].[ext]'
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file',
                query: {
                    mimetype: 'image/svg+xml',
                    limit: 10000,
                    name: './fonts/[hash].[ext]'
                }
            },
            {
                test: /ng-templates.*.html$/,
                loader: 'ngtemplate!html'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            THREE: "three",
        })
    ]
}

var nodeConfig = Object.assign({}, config, {
    target: 'node',
    externals: nodeExternals(),
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name]-node.bundle.js"
    },
});

module.exports = [config];