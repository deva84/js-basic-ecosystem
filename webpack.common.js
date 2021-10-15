const path = require('path');
const autoprefixer = require('autoprefixer');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve('src/scripts/main.js'),

    resolve: {
        modules: [
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                autoprefixer(),
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'bundle.min.css',
        }),
        new CopyPlugin([
            {from: 'src/images'},
           // {from: 'src/index.html'},
        ]),
    ]
};
