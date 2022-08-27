
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: [
        "./tabsScript.js",
        "./menuScript.js",
        "./reset.css",
        "./styles.css",
        "./mobile-styles.css",
        "./tablet-styles.css",
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin(),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: './index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
        })
    ],
    resolve: {
        extensions: ['.html', '.js', '.css'],
    }
};
