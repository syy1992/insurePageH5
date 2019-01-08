<template>
  <div>
    <div id='pay'>
      <x-header :left-options="{showBack: false}">订单支付</x-header>
      <group class='pay-info' title="订单信息">
        <cell title="方案名称：" value="" v-model='mapData[planNo]'></cell>
        <!--        <cell title="预订单号：" value="" v-model='proposalNo'></cell>-->
        <cell title="面积：" value="" v-model='riskName'></cell>
        <cell title="保费：" value="" v-model='sumPremium'></cell>
      </group>
      <x-button type="primary" @click.native='payOrder'>立即支付</x-button>
    </div>
    <div v-transfer-dom id='showDialog'>
      <x-dialog v-model="showDialogStyle" :hide-on-blur='isShow' :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;position: relative"  >
          <img src='../../../static/images/talk.png' style='width: 80%;'>
          <br>
          <br>
        </p>
      </x-dialog>
    </div>
    <div v-transfer-dom id='showResult'>
      <alert v-model="showResult" title="提示">
        <p style='padding-top: 10px;'>请查看<a  style='color:#FC9020;' class='report'>《投保确认函》</a></p>
      </alert>
    </div>
  </div>
</template>

<script>
    import {Alert,XHeader, Msg, Divider,XButton,Cell,Group, XDialog,TransferDomDirective as TransferDom,querystring,md5} from 'vux'
    //const time='';
    export default {
        name: 'exhibitionPay',
        components: {Alert,Group,Cell,XHeader,Msg,Divider,XButton,XDialog,},
        directives: {
            TransferDom
        },
        data () {
            return {
                planNo:decodeURIComponent(querystring.parse(location.search.substr(1)).planNo||''),
                proposalNo:decodeURIComponent(querystring.parse(location.search.substr(1)).proposalNo||''),
                riskName:decodeURIComponent(querystring.parse(location.search.substr(1)).planInfo||''),
                sumPremium:decodeURIComponent(querystring.parse(location.search.substr(1)).planPrice||''),
                showDialogStyle:false,
                isShow:false,
                showResult:false,
                timer:'',
                startTime:Number.MAX_SAFE_INTEGER,
                mapData:{
                    "JHOFFLCAROUT01": "展会保险车展馆外",
                    "JHOFFLCARIN011A": "展会保险车站馆内方案一（含展览会责任险）",
                    "JHOFFLCARIN011B": "展会保险车站馆内方案一（含安装工程一切险）",
                    "JHOFFLCARIN011AB": "展会保险车站馆内方案一（含展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN031A": "展会保险车站馆内方案二（含单层展览会责任险）",
                    "JHOFFLCARIN031B": "展会保险车站馆内方案二（含单层安装工程一切险）",
                    "JHOFFLCARIN031AB": "展会保险车站馆内方案二（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN032A": "展会保险车站馆内方案二（含双层展览会责任险）",
                    "JHOFFLCARIN032B": "展会保险车站馆内方案二（含双层安装工程一切险）",
                    "JHOFFLCARIN032AB": "展会保险车站馆内方案二（含双层安装工程一切险）",
                    "JHOFFLCARIN061A": "展会保险车站馆内方案三（含单层展览会责任险）",
                    "JHOFFLCARIN061B": "展会保险车站馆内方案三（含单层安装工程一切险）",
                    "JHOFFLCARIN061AB": "展会保险车站馆内方案三（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN062A": "展会保险车站馆内方案三（含双层展览会责任险）",
                    "JHOFFLCARIN062B": "展会保险车站馆内方案三（含双层安装工程一切险）",
                    "JHOFFLCARIN062AB": "展会保险车站馆内方案三（含双层安装工程一切险）",
                    "JHOFFLCARIN111A": "展会保险车站馆内方案四（含单层展览会责任险）",
                    "JHOFFLCARIN111B": "展会保险车站馆内方案四（含单层安装工程一切险）",
                    "JHOFFLCARIN111AB": "展会保险车站馆内方案四（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN112A": "展会保险车站馆内方案四（含双层展览会责任险）",
                    "JHOFFLCARIN112B": "展会保险车站馆内方案四（含双层安装工程一切险）",
                    "JHOFFLCARIN112AB": "展会保险车站馆内方案四（含双层安装工程一切险）",
                    "JHOFFLCARIN161A": "展会保险车站馆内方案五（含单层展览会责任险）",
                    "JHOFFLCARIN161B": "展会保险车站馆内方案五（含单层安装工程一切险）",
                    "JHOFFLCARIN161AB": "展会保险车站馆内方案五（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN162A": "展会保险车站馆内方案五（含双层展览会责任险）",
                    "JHOFFLCARIN162B": "展会保险车站馆内方案五（含双层安装工程一切险）",
                    "JHOFFLCARIN162AB": "展会保险车站馆内方案五（含双层安装工程一切险）",
                    "JHOFFLCARIN211A": "展会保险车站馆内方案六（含单层展览会责任险）",
                    "JHOFFLCARIN211B": "展会保险车站馆内方案六（含单层安装工程一切险）",
                    "JHOFFLCARIN211AB": "展会保险车站馆内方案六（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN212A": "展会保险车站馆内方案六（含双层展览会责任险）",
                    "JHOFFLCARIN212B": "展会保险车站馆内方案六（含双层安装工程一切险）",
                    "JHOFFLCARIN212AB": "展会保险车站馆内方案六（含双层安装工程一切险）",
                    "JHOFFLCARIN261A": "展会保险车站馆内方案七（含单层展览会责任险）",
                    "JHOFFLCARIN261B": "展会保险车站馆内方案七（含单层安装工程一切险）",
                    "JHOFFLCARIN261AB": "展会保险车站馆内方案七（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN262A": "展会保险车站馆内方案七（含双层展览会责任险）",
                    "JHOFFLCARIN262B": "展会保险车站馆内方案七（含双层安装工程一切险）",
                    "JHOFFLCARIN262AB": "展会保险车站馆内方案七（含双层安装工程一切险）",
                    "JHOFFLCARIN311A": "展会保险车站馆内方案八（含单层展览会责任险）",
                    "JHOFFLCARIN311B": "展会保险车站馆内方案八（含单层安装工程一切险）",
                    "JHOFFLCARIN311AB": "展会保险车站馆内方案八（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN312A": "展会保险车站馆内方案八（含双层展览会责任险）",
                    "JHOFFLCARIN312B": "展会保险车站馆内方案八（含双层安装工程一切险）",
                    "JHOFFLCARIN312AB": "展会保险车站馆内方案八（含双层安装工程一切险）",
                    "JHOFFLCARIN991A": "展会保险车站馆内方案九（含单层展览会责任险）",
                    "JHOFFLCARIN991B": "展会保险车站馆内方案九（含单层安装工程一切险）",
                    "JHOFFLCARIN991AB": "展会保险车站馆内方案九（含单层展览会责任险，安装工程一切险）",
                    "JHOFFLCARIN992A": "展会保险车站馆内方案九（含双层展览会责任险）",
                    "JHOFFLCARIN992B": "展会保险车站馆内方案九（含双层安装工程一切险）",
                    "JHOFFLCARIN992AB": "展会保险车站馆内方案九（含双层安装工程一切险）",
                    "JHOFFLDIGIT001": "展会保险数博展001",
                    "JHOFFLDIGIT002": "展会保险数博展002",
                    "JHOFFLDIGIT003": "展会保险数博展003",
                    "JHOFFLDIGIT004": "展会保险数博展004",
                    "JHOFFLDIGIT005": "展会保险数博展005",
                    "JHOFFLDIGIT006": "展会保险数博展006",
                    "JHOFFLDIGIT007": "展会保险数博展007",
                    "JHOFFLDIGIT008": "展会保险数博展008",
                    "JHOFFLDIGIT009": "展会保险数博展009",
                    "JHOFFLDIGIT010": "展会保险数博展010",
                    "JHOFFLDIGIT011": "展会保险数博展011",
                    "JHOFFLDIGIT012": "展会保险数博展012",
                    "JHOFFLDIGIT013": "展会保险数博展013",
                    "JHOFFLDIGIT014": "展会保险数博展014",
                    "JHOFFLDIGIT015": "展会保险数博展015",
                    "JHOFFLDIGIT016": "展会保险数博展016",
                    "JHOFFLOTHER001": "展会保险其他展会001",
                    "JHOFFLOTHER002": "展会保险其他展会002",
                    "JHOFFLOTHER003": "展会保险其他展会003",
                    "JHOFFLOTHER004": "展会保险其他展会004",
                    "JHOFFLOTHER005": "展会保险其他展会005",
                    "JHOFFLOTHER006": "展会保险其他展会006",
                    "JHOFFLOTHER007": "展会保险其他展会007",
                    "JHOFFLOTHER008": "展会保险其他展会008",
                    "JHOFFLOTHER009": "展会保险其他展会009",
                    "JHOFFLCARIN002B": "展会保险车展馆内方案二（双层）",
                    "JHOFFLCARIN003B": "展会保险车展馆内方案三（双层）",
                    "JHOFFLCARIN004B": "展会保险车展馆内方案四（双层）",
                    "JHOFFLCARIN005B": "展会保险车展馆内方案五（双层）",
                    "JHOFFLCARIN006B": "展会保险车展馆内方案六（双层）",
                    "JHOFFLCARIN007B": "展会保险车展馆内方案七（双层）",
                    "JHOFFLCARIN008B": "展会保险车展馆内方案八（双层）",
                    "JHOFFLCARIN009B": "展会保险车展馆内方案九（双层）"
                }
            }
        },
        methods: {
            payOrder(){
                var reqTid = new Date().getTime();
                var account = process.env.exhibitionAccount;
                var privateKey = process.env.exhibitionPrivateKey;
                var payInfo= {
                    account: account,
                    reqTid: reqTid,
                    sign: sign,
                    data: JSON.stringify({
                        proposalNo:this.proposalNo
                    })
                }
                var sign = md5("account"+account+"data"+payInfo.data+"reqTid"+reqTid+privateKey).toString().toUpperCase();
                payInfo.sign = sign;
                console.log('payInfo='+JSON.stringify(payInfo))
                this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/wexin/pay/jhfh5',payInfo).then(({data}) => {
//                this.$http.post('https://www.guohetech.com/ins_consumer/insurance/wexin/pay/jhfh5',payInfo).then(({data}) => {
                    console.log(data)
                    switch (data.resCode) {
                        case '0000'://成功
                          /*   this.isFetching = false;*/
                            console.log('payResult=' + data);
                            let payUrl = JSON.parse(data.data).payUrl;
                            console.log('payUrl=' + payUrl);
                            window.open(payUrl, '_self');
                            break;
                        case '1001'://账号不存在或被禁用
                            alert(data.resMsg)
                            break;
                        case '1002'://
                            alert(data.resMsg)
                            break;
                        case '1003'://必填写项为空
                            alert(data.resMsg)
                            break;
                        case '1004'://验签失败
                            alert(data.resMsg)
                            break;
                        case '9999'://系统异常
                            alert(data.resMsg)
                            break;
                        default:
                        //
                    }
                });
            },
            judgeUA(){
                let ua= navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=='micromessenger') {
                  /*alert("weixin");*/
                    this.showDialogStyle=true;
                }else {
                    this.showDialogStyle=false;
                }
            },
            getReport(){
                //用于测试的逻辑：如果距离开轮询的时间已经过去2分钟，则取消轮询的定时器。正常使用时 逻辑可能为：如果轮询取到了pdf，则停止轮询
                if(new Date().getTime()-this.startTime>2*60*1000){//执行
                    clearInterval(this.timer)  //取消定时器
                }
//                this.$http.post('https://www.guohetech.com/ins_consumer/insurance/exhib/checkPayByProposalNo',{proposalNo:this.proposalNo}).then(({data}) => {
                this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/exhib/checkPayByProposalNo',{params:{proposalNo:this.proposalNo}}).then(({data}) => {
                    console.log(data)
                  /* alert(data)*/
//                data.data.payStatus=localStorage.test;//
                    console.log("data.data.payStatus="+data.data.payStatus)
                    if(data.data.payStatus=='1'){
//                        let src='https://www.guohetech.com/images/exhib-pdf-files/'+this.proposalNo+'.pdf';
                        let src=process.env.baseShortUrl+process.env.commonPort+'/images/exhib-pdf-files/'+this.proposalNo+'.pdf';
                        let report= document.getElementsByClassName('report')[0];
                        let report1= document.getElementsByClassName('weui-dialog__btn')[0];
                        report.setAttribute('href',src)
                        report1.setAttribute('href',src)
                        this.showDialogStyle=false;
                        this.showResult=true;
                        clearInterval(this.timer)
                    }
                });
            },

            count1(){
                this.startTime=new Date().getTime(); //记录开始轮询的时间
                this.timer=setInterval(() => { this.getReport()},5000)

            },
        },
        mounted(){
            this.judgeUA();
            this.count1()
        },
    }
</script>
<style lang="scss">
  @function r($px){
    @return $px /2/18.75 * 1rem;
  }
  body{
    background-color: #efeff4;
  }
  #pay{
    .pay-info{margin: 15px;    background: #fff;}
    .weui-cells__title{    height: 3.3rem;
      margin: 0;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-radius: 5px 5px 0 0;
      background-color: #f7f6f6;
      box-shadow: 0 0 13px #cdcdcd;
      color: #000;
      line-height: 3.3rem;}

    .weui-cells{margin-top: 0;    border: 1px solid #ccc;&:before{display: none;}}
    .weui-cell{&:before{right: 15px}}
    .vux-label{font-size: 0.9rem;line-height: 1.9rem;}
    .weui-cell__ft{font-size: 0.9rem;color: #666666}
    .weui-btn{width: 90%;background: #FC9020;}
    .vux-cell-primary{p{width: 100px;}}
  }
</style>
