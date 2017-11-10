/**
 * Created by pgotthardt on 14/01/16.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

var isProduction = process.env.NODE_ENV === 'production';
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


var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), new HtmlWebpackPlugin({
        template: __dirname + '/index.html',
        filename: 'index.html',
        inject: 'body'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(
                process.env.NODE_ENV || 'development'
            )
        }
    }),
    new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        // Host that will be used in `server` mode to start HTTP server.
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server.
        analyzerPort: 8888
    })
];


/**
 * Extract text webpack plugin only for production.
 * Reference: https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
 */
var cssProduction = {
    test: /\.(s)?css$/,
    loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
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

/**
 * Extract text plugin - Production only
 */
if (isProduction) {
    plugins.push(new ExtractTextPlugin('style.css'));
}

/**
 * UglifyJS Plugin - Production only
 */
if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: loaders
    },
    plugins: plugins,
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true
    }
};