const path = require('path');
const config = require('./src/app-config');
const HtmlPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopmentMode = argv.mode === 'development';

    const workbox = (!isDevelopmentMode && config.caching && config.caching.strategy) ? (
        new WorkboxPlugin.GenerateSW({
            swDest: 'sw.js',
            runtimeCaching: [{
                urlPattern: /\.(js|css|html|svg|jpg|jpeg|png|ico|json|xml|webmanifest)$/,
                handler: config.caching.strategy
            }],
            clientsClaim: true,
            skipWaiting: true
        })
    ) : null;

    return {
        entry: './src/app/App.jsx',
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
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
                inject: 'body',
                properties: {
                    title: config.name
                }
            }),
            new StyleLintPlugin(),
            new CopyWebpackPlugin([
                { from: 'src/static' },
                { from: 'src/images', to: 'images' }
            ]),
            workbox,
            new WebpackPwaManifest({
                name: config.name,
                short_name: config.nameShort,
                description: config.description,
                background_color: config.accentColor,
                fingerprints: false,
                ios: {
                    'apple-mobile-web-app-status-bar-style': 'black-translucent'
                }
            })
        ].filter(Boolean),
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
                                sourceMap: true,
                                data: `$accent-color: ${config.accentColor};`
                            }
                        },
                        'postcss-loader'
                    ]
                }, {
                    test: /\.svg$/,
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
                Components: path.resolve(__dirname, 'src/app/components/'),
                Layouts: path.resolve(__dirname, 'src/app/layouts/'),
                Pages: path.resolve(__dirname, 'src/app/pages/'),
                Images: path.resolve(__dirname, 'src/images/'),
                Icons: path.resolve(__dirname, 'src/images/icons/'),
                helpers: path.resolve(__dirname, 'src/app/helpers.js'),
                'app-config': path.resolve(__dirname, 'src/app-config.js')
            }
        }
    };
};
