const path = require('path');
const config = require('./src/config');
const HtmlPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app/App.jsx',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanPlugin(['dist']),
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            title: config.appName,
            inject: 'body'
        }),
        new StyleLintPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/static' },
            { from: 'src/images', to: 'images' }
        ]),
        new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            runtimeCaching: [{
                urlPattern: /\.(js|css|html|svg|jpg|png|ico|json|xml|csv|webmanifest)$/,
                handler: config.caching.strategy
            }],
            clientsClaim: true,
            skipWaiting: true
        }),
        new ManifestPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'react',
                                ['env', {
                                    targets: {
                                        browsers: ['last 2 versions']
                                    }
                                }]
                            ],
                            plugins: ['react-component-data-attribute']
                        }
                    },
                    'eslint-loader'
                ]
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'postcss-loader'
                ]
            }, {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 16000,
                            name: 'images/[name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
};
