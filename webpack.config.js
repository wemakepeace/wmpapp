const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './client/src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: [ '.js', '.json' ],
        modules: [ path.resolve(__dirname, 'client'), 'node_modules' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ 'env', 'react', 'stage-1' ],
                    plugins: [ 'transform-decorators-legacy', 'transform-object-rest-spread' ]
                }
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 presets: [ 'env', 'react', 'stage-1'],

            //             }
            //         }
            //     ]
            // },
            {
                test: /\.scss|css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader']
                })
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[text]',
                            outputPath: 'fonts/',
                            publicPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[text]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
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
        new webpack.ProvidePlugin({ // to enable jquery
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin, // to extract css into own file
        new HtmlWebpackPlugin({
            hash: true,
            meta: {
                meta: {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
                viewport: 'width=device-width, initial-scale=1'
            },
            title: 'WE MAKE PEACE Letters'
        }),
        // new CleanWebPackPlugin(['dist']), // to remove dist folder before each build,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};


  <meta name="viewport" content="width=device-width, initial-scale=1">
