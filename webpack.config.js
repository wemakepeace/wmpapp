const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');


const extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});


module.exports = {
    entry: './client/src/index.js',  // can be array, can be object with aliases or string
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-1']
                        }
                    }
                ]
            },
            {
                test: /\.scss|css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
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

    plugins: [
        new webpack.ProvidePlugin({ // to enable jquery
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractPlugin, // to extract css into own file
        new HtmlWebpackPlugin({ // to create the html file
            template: 'client/src/index.html'
        }),
        new CleanWebPackPlugin(['dist']) // to remove dist folder before each build
    ]
};
