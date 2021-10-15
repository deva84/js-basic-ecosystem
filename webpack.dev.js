const path = require('path');
const {merge} = require('webpack-merge')
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common,
    {
        mode: 'development',
        devtool: 'source-map',
        output: {
            filename: "bundle.js",
            path: path.resolve('dist')
        },
        devServer: {
            static: './dist',
        },
        plugins: [
            new CopyPlugin([
                {from: 'src/index.html'},
            ]),
        ]
    });
