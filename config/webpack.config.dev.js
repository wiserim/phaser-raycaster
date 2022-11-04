const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "phaser-raycaster": "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js",
        library: 'PhaserRaycaster',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}
