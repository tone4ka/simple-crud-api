const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    target: "node",
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "16.13.0"
                            }
                        }
                    ]
                ]
            }
        }]
    },
    resolveLoader: {
        modules: [
            __dirname + '/node_modules'
        ]
    }
}
