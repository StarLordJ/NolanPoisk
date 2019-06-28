const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: "./src/index",
    output: {
        path: path.join(__dirname, "/distr"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: `distr/css/styles.css`,
        })
    ],
    devServer: {
        proxy: [{
            context: [""],
            target: "http://localhost:5000",
        }]
    }
}
