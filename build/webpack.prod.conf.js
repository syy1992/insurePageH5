'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const rongdeploy = require('rongdeploy');


const env = require('../config/prod.env')  //被syy 注释掉
// const env = config.build[process.env.env_config+'Env']; //add byy syy


const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js?t=[chunkhash:7]'),
        chunkFilename: utils.assetsPath('js/[name].js?t=[chunkhash:7]')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css?t=[contenthash:7]'),
            // set the following option to `true` if you want to extract CSS from
            // codesplit chunks into this main css file as well.
            // This will result in *all* of your app's CSS being loaded upfront.
            allChunks: false,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? { safe: true, map: { inline: false } } : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin

        // keep module.id stable when vender modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (m) => /node_modules/.test(m.context)
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
    //被 syy 注释掉
/*        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),*/
        // add by syy
        new webpack.DefinePlugin({
            'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"',
            'process.env.baseShortUrl': '\"' + process.env.baseShortUrl + '\"',
            'process.env.xiaobaoAccount': '\"' + process.env.xiaobaoAccount + '\"',
            'process.env.AccountSelf':'\"' + process.env.AccountSelf+ '\"',
            'process.env.jiacaiAccountA':'\"' + process.env.jiacaiAccountA+ '\"',
            'process.env.jiacaiAccountB':'\"' + process.env.jiacaiAccountB+ '\"',
            'process.env.anxinAccount':'\"' + process.env.anxinAccount+ '\"',
            'process.env.xiaobaoPrivateKey':'\"' + process.env.xiaobaoPrivateKey+ '\"',
            'process.env.selfPrivateKey':'\"' + process.env.selfPrivateKey+ '\"',
            'process.env.jiacaiAPrivateKey':'\"' + process.env.jiacaiAPrivateKey+ '\"',
            'process.env.jiacaiBPrivateKey':'\"' + process.env.jiacaiBPrivateKey+ '\"',
            'process.env.anxinPrivateKey':'\"' + process.env.anxinPrivateKey+ '\"',
            'process.env.anxinPayUrl':'\"' + process.env.anxinPayUrl+ '\"',
            'process.env.exhibitionAccount':'\"' + process.env.exhibitionAccount+ '\"',
            'process.env.exhibitionPrivateKey':'\"' + process.env.exhibitionPrivateKey+ '\"',
            'process.env.fuxingAccount':'\"' + process.env.fuxingAccount+ '\"',
            'process.env.fuxingPrivateKey':'\"' + process.env.fuxingPrivateKey+ '\"',
            'process.env.commonPort':'\"' + process.env.commonPort+ '\"',
            'process.env.picBaseUrl':'\"' + process.env.picBaseUrl+ '\"',
            'process.env.gymAccount':'\"' + process.env.gymAccount+ '\"',
            'process.env.gymprivateKey':'\"' + process.env.gymprivateKey+ '\"',
            'process.env.driveAccount':'\"' + process.env.driveAccount+ '\"',
            'process.env.driveprivateKey':'\"' + process.env.driveprivateKey+ '\"',
            'process.env.snailPlatAccount':'\"' + process.env.snailPlatAccount+ '\"',
            'process.env.snailPrivateKey':'\"' + process.env.snailPrivateKey+ '\"',
            'process.env.appId':'\"' + process.env.appId+ '\"',
            'process.env.imgUrl':'\"' + process.env.imgUrl+ '\"',
            'process.env.indexUrl':'\"' + process.env.indexUrl+ '\"',
            'process.env.aishenAccount':'\"' + process.env.aishenAccount+ '\"',
            'process.env.aishenPrivateKey':'\"' + process.env.aishenPrivateKey+ '\"',
            'process.env.AccountKeyuan':'\"' + process.env.AccountKeyuan+ '\"',
            'process.env.KeyuanPrivateKey':'\"' + process.env.KeyuanPrivateKey+ '\"',
            'process.env.driverSmall':'\"' + process.env.driverSmall+ '\"',
        }),

    ]
})

//不同的入口添加不同模板 并保证 chunks的顺序
let entry = baseWebpackConfig.entry;
for (let name in entry) {
    if (name.indexOf('page') > -1) {
        let chunks = ['manifest', 'vendor', 'common']
        chunks.push(name)
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: path.resolve(__dirname, '../../release/' + name + '.html'),
                chunks: chunks,
                template: path.resolve(__dirname, '../src/' + name + ".html"),
                inject: true,
                chunksSortMode: function(chunk1, chunk2) {
                    var order = chunks;
                    var order1 = order.indexOf(chunk1.names[0]);
                    var order2 = order.indexOf(chunk2.names[0]);
                    return order1 - order2;
                }
            })
        )
    }
}

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig