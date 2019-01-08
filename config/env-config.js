/**
 * Created by m1833 on 2018/7/11.
 */
/**
 * 多环境配置，支持打包dev、test、prod等任意套环境的配置和选取。每套环境中可配置baseUrl、assetsPublicPath
 * 参考：vuejs添加环境常量----多环境开发打包场景解决方案之一 - 个人文章 - SegmentFault 思否  https://segmentfault.com/a/1190000014899779?utm_source=channel-hottest
 * Created by m1833 on 2018/7/10.
 */
/*
 使用方法示例：
 打包：
 打包dev环境：npm run build --dev
 打包test环境：npm run build --test
 打包pro环境：npm run build --pro
 本地运行：
 本地运行dev环境：npm run dev --dev
 本地运行test环境：npm run dev --test
 无【--xxx】参数，则默认为dev环境：npm run dev
 */
'use strict'

const chalk = require('chalk')
const path = require('path')
/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * baseUrl: 这个环境下面的api 请求的域名
 * assetsPublicPath: 静态资源存放的域名，未指定则使用相对路径
 * */
const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        dirName: 'dev',
        // baseUrl: 'http://192.168.1.50',  //ajax请求的baseUrl 王安
        baseUrl: 'http://192.168.1.3',  //ajax请求的baseUrl 钟尧
        baseShortUrl: 'http://192.168.1.3',  //ajax请求的baseUrl
        commonPort:':8765',
        picBaseUrl:'https://www.guohetech.com/ins_upload',//改这里 :8762
        assetsPublicPath:'/',
        xiaobaoAccount:'school_pub_liab_test',
        AccountSelf:'WeChain_test',
        AccountKeyuan:'school_keyuan_test',
        KeyuanPrivateKey:'ak@38~!pT',
        jiacaiAccountA:'sun_house_test',
        jiacaiAccountB:'sun_house_test',
        anxinAccount:'anti_cancer_test',
        exhibitionAccount:'exhibit_h5_test',
        fuxingAccount:'fosun_test',
        exhibitionPrivateKey:'ak@38~!pT',
        xiaobaoPrivateKey:'ak@38~!pT',
        selfPrivateKey:'ak@38~!pT',
        jiacaiAPrivateKey:'ak@38~!pT',
        jiacaiBPrivateKey:'ak@38~!pT',
        anxinPrivateKey:'ak@38~!pT',
        fuxingPrivateKey:'ak@38~!pT',//改动过
        anxinPayUrl:'http://axwxtest.95303.com/axPay/pay/unusual',
        gymAccount: 'KisFit',
        gymprivateKey: 'ak@38~!pT',//改动过
        driveAccount: 'drive_accident',
        driveprivateKey: 'ak@38~!pT',
        snailPlatAccount:'snail_test',
        snailPrivateKey:'ak@38~!pT',
        appId: 'wxef1373db41e4fc6a',
        imgUrl: 'https://www.guohetech.com',
        indexUrl: 'https://www.guohetech.com/pay_page/driverIndex.html',
        aishenAccount:'LoveRenal_test',
        aishenPrivateKey:'ak@38~!pT',
        driverSmall: 'http://47.104.104.38'
    },
    {
        //测试环境
        envName: 'test',
        dirName: path.resolve(__dirname, '../../release/'),
        // baseUrl: 'http://47.104.24.10',
        baseUrl: 'https://www.guohetech.com/ins_consumer',
        baseShortUrl: 'https://www.guohetech.com',
        imgUrl: 'https://www.guohetech.com',
        commonPort:'',//改这里    :8765
        picBaseUrl:'https://www.guohetech.com/ins_upload',//改这里 :8762
        assetsPublicPath: '/',
        xiaobaoAccount:'school_pub_liab_test',
        AccountSelf:'WeChain_test',
        AccountKeyuan:'school_keyuan_test',
        KeyuanPrivateKey:'ak@38~!pT',
        jiacaiAccountA:'sun_house_test',
        jiacaiAccountB:'sun_house_test',
        anxinAccount:'anti_cancer_test',
        exhibitionAccount:'exhibit_h5_test',
        fuxingAccount:'fosun_test',
        exhibitionPrivateKey:'ak@38~!pT',
        xiaobaoPrivateKey:'ak@38~!pT',
        selfPrivateKey:'ak@38~!pT',
        jiacaiAPrivateKey:'ak@38~!pT',
        jiacaiBPrivateKey:'ak@38~!pT',//商户版以后会替换
        anxinPrivateKey:'ak@38~!pT',//以后会替换
        fuxingPrivateKey:'ak@38~!pT',//改动过
        anxinPayUrl:'http://axwxtest.95303.com/axPay/pay/unusual',
        gymAccount: 'KisFit',   //健身和游泳的字段和秘钥相同
        gymprivateKey: 'ak@38~!pT', //改动过
        driveAccount: 'drive_accident',
        driveprivateKey: 'ak@38~!pT',
        snailPlatAccount:'snail_test',
        snailPrivateKey:'ak@38~!pT',
        appId: 'wxef1373db41e4fc6a',
        indexUrl: 'https://www.guohetech.com/pay_page/driverIndex.html',
        aishenAccount:'LoveRenal_test',
        aishenPrivateKey:'ak@38~!pT',
        driverSmall: 'http://47.104.104.38'
    },
    {
        //生产环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'pro',
        dirName: path.resolve(__dirname, '../../release/'),
        // baseUrl: 'http://47.104.104.38',//改这里
        baseUrl: 'https://service.supplyfintech.com/ins_consumer',//改这里
        baseShortUrl: 'https://service.supplyfintech.com',
        imgUrl: 'https://www.supplyfintech.com',
        commonPort:'',//改这里 :8765
        picBaseUrl:'https://service.supplyfintech.com/ins_upload',//改这里 :8762
        assetsPublicPath: '/',
        xiaobaoAccount:'school_pub_liab',
        AccountSelf:'WeChain',
        AccountKeyuan:'school_keyuan',
        KeyuanPrivateKey:'Tp!~83@ka',
        jiacaiAccountA:'KLRQ',
        jiacaiAccountB:'KLRQ',//以后会替换
        anxinAccount:'anti_cancer',
        exhibitionAccount:'exhibit_h5',
        fuxingAccount:'fosun',
        exhibitionPrivateKey:'Tp!~83@ka',
        xiaobaoPrivateKey:'Tp!~83@ka', //ak@32jfj5~!3jf5dpT
        selfPrivateKey:'Tp!~83@ka',

        jiacaiAPrivateKey:'Tp!~83@ka',
        jiacaiBPrivateKey:'Tp!~83@ka',//商户版以后会替换
        anxinPrivateKey:'Tp!~83@ka',
        fuxingPrivateKey:'Tp!~83@ka',
        anxinPayUrl:'https://weixin.95303.com/axPay/pay/unusual',//安心生产url
        gymAccount: 'KisFit',
        gymprivateKey: 'Tp!~83@ka',
        driveAccount: 'drive_accident',
        driveprivateKey: 'Tp!~83@ka',
        snailPlatAccount:'snail',
        snailPrivateKey:'Tp!~83@ka',
        appId: 'wxa4caacc8102bd8d5',
        indexUrl: 'https://www.supplyfintech.com/pay_page/driverIndex.html',
        aishenAccount:'LoveRenal',
        aishenPrivateKey:'Tp!~83@ka',
        driverSmall: 'http://47.104.104.38'
    },
]

console.log("process.env.assetsPublicPath="+process.env.assetsPublicPath)
//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
//没有设置环境，则默认为第一个
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[0]
// 把环境常量挂载到process.env.HOST_ENV方便客户端使用
process.env.BASE_URL = HOST_CONF.baseUrl
process.env.baseShortUrl = HOST_CONF.baseShortUrl
process.env.xiaobaoAccount = HOST_CONF.xiaobaoAccount
process.env.AccountSelf = HOST_CONF.AccountSelf
process.env.jiacaiAccountA = HOST_CONF.jiacaiAccountA
process.env.jiacaiAccountB = HOST_CONF.jiacaiAccountB
process.env.anxinAccount = HOST_CONF.anxinAccount
process.env.xiaobaoPrivateKey = HOST_CONF.xiaobaoPrivateKey
process.env.selfPrivateKey = HOST_CONF.selfPrivateKey
process.env.jiacaiAPrivateKey = HOST_CONF.jiacaiAPrivateKey
process.env.jiacaiBPrivateKey = HOST_CONF.jiacaiBPrivateKey
process.env.anxinPrivateKey = HOST_CONF.anxinPrivateKey
process.env.anxinPayUrl = HOST_CONF.anxinPayUrl
process.env.exhibitionAccount = HOST_CONF.exhibitionAccount
process.env.exhibitionPrivateKey = HOST_CONF.exhibitionPrivateKey
process.env.fuxingAccount = HOST_CONF.fuxingAccount
process.env.fuxingPrivateKey = HOST_CONF.fuxingPrivateKey
process.env.commonPort = HOST_CONF.commonPort
process.env.picBaseUrl = HOST_CONF.picBaseUrl

process.env.gymAccount = HOST_CONF.gymAccount
process.env.gymprivateKey = HOST_CONF.gymprivateKey
process.env.snailPlatAccount = HOST_CONF.snailPlatAccount
process.env.snailPrivateKey = HOST_CONF.snailPrivateKey
process.env.baseShortUrl = HOST_CONF.baseShortUrl

process.env.driveAccount = HOST_CONF.driveAccount
process.env.driveprivateKey = HOST_CONF.driveprivateKey
process.env.appId = HOST_CONF.appId
process.env.imgUrl = HOST_CONF.imgUrl
process.env.indexUrl = HOST_CONF.indexUrl
process.env.aishenAccount = HOST_CONF.aishenAccount
process.env.aishenPrivateKey = HOST_CONF.aishenPrivateKey

process.env.AccountKeyuan = HOST_CONF.AccountKeyuan
process.env.KeyuanPrivateKey = HOST_CONF.KeyuanPrivateKey
process.env.driverSmall = HOST_CONF.driverSmall

// process.env.assetsRoot= HOST_CONF.dirName
// process.env.assetsPublicPath= HOST_CONF.assetsPublicPath
// log选中的变量
console.log(chalk.green('当前环境：'))
console.log(HOST_ENV)
console.log(chalk.green('当前环境对应的常量：'))
console.log(HOST_CONF)

module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST

