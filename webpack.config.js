const path = require('path');
const config = require('./src/app-config');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = () => {
    return {
        entry: './src/app/App.jsx',
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            historyApiFallback: true
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new CleanPlugin(['./dist']),
            new HtmlPlugin({
                template: path.resolve(__dirname, 'src/index.html_template'),
                filename: 'index.html',
                inject: true,
                properties: config
            }),
            new WebappWebpackPlugin({
                logo: './src/images/icon.png',
                inject: true,
                prefix: 'images/favicons',
                ios: {
                    'apple-mobile-web-app-status-bar-style': 'black-translucent'
                },
                favicons: {
                    appName: config.nameShort,
                    appDescription: config.description,
                    developerName: config.developerName,
                    developerURL: config.developerUrl,
                    lang: 'cs-CZ',
                    background: '#FFF',
                    theme_color: config.accentColor,
                    orientation: 'portrait',
                    start_url: '/index.html?pwa=true',
                    icons: {
                        coast: false,
                        yandex: false
                    }
                }
            }),
            new StyleLintPlugin(),
            new CopyWebpackPlugin([
                { from: 'src/static' },
                { from: 'src/images', to: 'images' }
            ])
        ].filter(Boolean),
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
                                    'transform-object-rest-spread',
                                    'react-component-data-attribute'
                                ],
                                presets: [
                                    'react',
                                    ['env', {
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
                helpers: path.resolve(__dirname, 'src/app/helpers.js'),
                constants: path.resolve(__dirname, 'src/app/constants.js'),
                'app-config': path.resolve(__dirname, 'src/app-config.js')
            }
        },
        node: {
            fs: 'empty'
        }
    };
};
