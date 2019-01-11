const webpack = require('webpack');
const path = require('path');
const config = require('./src/app-config');
const moment = require('moment');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = env => {
    console.log('Build started with following arguments:', env || 'NONE');

    return {
        entry: {
            bundle: './src/app/App.jsx',
            sw: './src/app/sw.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            globalObject: 'this'
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            host: '0.0.0.0',
            historyApiFallback: true
        },
        plugins: [
            new CleanPlugin(['./dist']),
            new HtmlPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html',
                inject: true,
                properties: config
            }),
            new WebappWebpackPlugin({
                logo: './src/images/icon.png',
                inject: true,
                prefix: 'images/favicons',
                ios: { 'apple-mobile-web-app-status-bar-style': 'black-translucent' },
                favicons: {
                    appName: config.nameShort,
                    appDescription: config.description,
                    developerName: 'Jan Chalupa',
                    developerURL: 'http://www.honzachalupa.cz/',
                    lang: 'cs-CZ',
                    background: config.accentColor,
                    theme_color: config.accentColor,
                    orientation: 'portrait',
                    start_url: 'index.html?pwa=true'
                }
            }),
            new StyleLintPlugin(),
            new CopyWebpackPlugin([
                { from: 'src/static' },
                { from: 'src/images', to: 'images' }
            ]),
            new webpack.DefinePlugin({
                __BUILDDATE__: `'${moment().format('D.M.YYYY')}'`,
                __BUILDTARGET__: `'${env ? env.buildTarget : ''}'`,
                __BASENAME__: `'${env ? env.baseName : '/'}'`
            })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: [
                                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-syntax-dynamic-import',
                                    '@starmandeluxe/babel-plugin-react-component-data-attribute'
                                ],
                                presets: [
                                    '@babel/preset-react',
                                    ['@babel/preset-env', {
                                        targets: {
                                            browsers: [
                                                'last 2 Chrome versions',
                                                'last 2 Firefox versions',
                                                'last 2 Safari versions',
                                                'last 2 iOS versions',
                                                'Android >= 4.4',
                                                'Edge >= 12',
                                                'Explorer >= 11'
                                            ]
                                        }
                                    }]
                                ]
                            }
                        },
                        'eslint-loader'
                    ]
                }, {
                    test: /\.s?css$/,
                    include: path.resolve(__dirname, 'src'),
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
                                sourceMap: true,
                                data: `$accent-color: ${config.accentColor};`
                            }
                        },
                        'postcss-loader'
                    ]
                }, {
                    test: /\.svg$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }, {
                    test: /\.(png|jp(e?)g)$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss', '.svg', '.jpg', '.jpeg', '.png'],
            alias: {
                App: path.resolve(__dirname, 'src/app/App.jsx'),
                Components: path.resolve(__dirname, 'src/app/components/'),
                Layouts: path.resolve(__dirname, 'src/app/layouts/'),
                Pages: path.resolve(__dirname, 'src/app/pages/'),
                Images: path.resolve(__dirname, 'src/images/'),
                Icons: path.resolve(__dirname, 'src/images/icons/'),
                Helpers: path.resolve(__dirname, 'src/app/helpers/'),
                constants: path.resolve(__dirname, 'src/app/constants.js'),
                'app-config': path.resolve(__dirname, 'src/app-config.js')
            }
        },
        node: {
            fs: 'empty'
        }
    };
};
