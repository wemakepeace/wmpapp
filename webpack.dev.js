const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
        stats: 'errors-only',
        open: true,
        port: 3000,
        compress: true,
        hot: true,
        proxy: {
            // '**': 'http://localhost:8080'
            '*': 'http://[::1]:8080'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
