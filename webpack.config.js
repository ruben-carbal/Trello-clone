const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");
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
        extensions: ['', '.js', '.sass'],
        modulesDirectories: ['node_modules'],
    },

    module: {
        noParse: /vendor\/phoenix/,
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: ['transform-decorators-legacy'],
                    presets: ['react', 'es2015', 'stage-2', 'stage-0'],
                },
            },
            {
                test: /\.sass$/,
                loader: extractTextPlugin.extract('style', 'css!sass?indentedSyntax&includePaths[]=' + __dirname + '/node_modules'),
            },
        ],
    },

    plugins: [
        new extractTextPlugin('css/application.css'),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    );
}

