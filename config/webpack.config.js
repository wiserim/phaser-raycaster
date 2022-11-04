const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        "phaser-raycaster": "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].min.js",
        library: 'PhaserRaycaster',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    watch: false,
    watchOptions: {
        ignored: '**/node_modules',
    },
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
