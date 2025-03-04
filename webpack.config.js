const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const join = dest => path.resolve(__dirname, dest);
const web = dest => join('web/static/' + dest);

const config = module.exports = {
    entry: {
        application: [
            web('css/application.sass'),
            web('js/application.js'),
        ],
    },

    output: {
        path: join('priv/static'),
        filename: 'js/application.js',
    },

    resolve: {
        extensions: ['.js', '.sass'],
        modules: ['node_modules'],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/application.css',
        }),
    ],

    module: {
        noParse: /vendor\/phoenix/,
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        plugins: ['transform-decorators-legacy'],
                        presets: ['react', 'es2015', 'stage-2', 'stage-0'],

                    },
                },
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    );
}

