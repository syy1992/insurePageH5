'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const path = require('path')

const express = require('express')
const router = require('./dev-server-router')
const app = express()

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        before(app) {
            app.use(router)
        },
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: process.env.HOST ||  config.dev.host,
        port: process.env.PORT ||  config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true,
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
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

//不同的入口添加不同模板
let entry = baseWebpackConfig.entry;
for (let name in entry) {
    if (name.indexOf('page') > -1) {
        let chunks = ['manifest', 'vendor', 'common', name]
        devWebpackConfig.plugins.push(
            new HtmlWebpackPlugin({
                filename: name + '.html',
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


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${config.dev.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})