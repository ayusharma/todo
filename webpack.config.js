/**
 * Created by pgotthardt on 14/01/16.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
/**
 * Babel Loader
 */
var loaders = [{
    loader: 'babel',
    test: /\.js$/,
    include: [path.resolve(__dirname, 'src', 'js')],
    query: {
        plugins: ['transform-runtime'],
        presets: ['es2015']
    }
}];


/**
 * Extract text webpack plugin only for production.
 * Reference: https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
 */
var cssProduction = {
    test: /\.(s)?css$/,
    loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"]),
    include: [path.resolve(__dirname, 'src', 'css')],
}

/**
 * SCSS/CSS loader for development mode.
 */
var cssDevelopment = {
    test: /\.(s)?css$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: [path.resolve(__dirname, 'src', 'css')],
}

// Pusing all loader according to environment.
loaders.push(isProduction ? cssProduction : cssDevelopment);


module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: loaders
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true
    }
};