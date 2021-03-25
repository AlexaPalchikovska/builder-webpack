const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ( env, argv ) => {

    let webpackConfig = {
        mode: 'development',
        entry: {
            app: 'app.js'
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: ''
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: ['file-loader?name=[name].html', 'pug-html-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        'file-loader?name=[name].css',
                        'extract-loader',
                        'css-loader',
                        'sass-loader',
                        'import-glob-loader'
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|ico)$/,
                    use: ['file-loader?name=img/[name].[ext]']
                }
            ]
        },
        resolve: {
            modules: [path.resolve(__dirname, './')]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['**/*']
            }),
            new CopyPlugin({
                patterns: [
                  { from: "src/img", to: "img" },
                  { from: "src/video", to: "video" },
                ],
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            compress: false,
            port: 9000,
        }
    }

    return webpackConfig;

}