const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {merge} = require('webpack-merge')
const common = require('./webpack.common');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require('webpack');
const package_ = require('./package.json');
const banner = package_.name + ' - ' + package_.version;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,
    {
        mode: 'production',
        optimization: {
            minimizer: [
                new TerserJSPlugin(),
                new OptimizeCSSAssetsPlugin(),
            ],
        },

        output: {
            filename: 'bundle.min.[contenthash].js',
            path: path.resolve('dist')
        },
        module: {
            rules: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: "src/images",
                    use: ImageMinimizerPlugin,
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
            ],
        },
        plugins: [
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ["gifsicle", {interlaced: true}],
                    ],
                },
            }),
            new UglifyJsPlugin({
                test: /\.js$/,
                exclude: /node_modules/,
                sourceMap: true,
                uglifyOptions: {
                    compress: {},
                    mangle: true,
                }
            }),
            new webpack.BannerPlugin(banner),
            new HtmlWebpackPlugin(),
        ],
    });
