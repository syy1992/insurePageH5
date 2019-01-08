<template>
  <div id="get_val">
    <x-header :left-options="{showBack: false}">选择支付方式</x-header>
    <group :title='""' :gutter=0>
      <cell :title='"1:微信公众号;2:支付宝H5;3:微信PC;4:支付宝PC;5:微信APP;6:支付宝APP;7:微信H5(WAP);8:银联WAP;9:POS机;"'  class='subTitle' style='display: none'>
      </cell>
    </group>
    <!--<div>1:微信公众号;2:支付宝H5;3:微信PC;4:支付宝PC;5:微信APP;6:支付宝APP;7:微信H5(WAP);8:银联WAP;9:POS机;</div>-->
      <group title="">
          <radio :selected-label-style="{color: '#FF9900'}" :options="radioCheckList" v-model="radioValue"></radio>
      </group>
      <x-button type="primary" style='width: 80%;margin-top: 30px;' @click.native='ajaxPayQuery'>提交</x-button>
  </div>
</template>
<script>

    import {
        XHeader,
        Group,
        Cell,
        Loading,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem,
        Radio,
        XInput,
        XButton,
        querystring,
        md5,
        PopupPicker,
        Popup,
        CheckIcon,
        AlertModule, Alert,
//    Checklist,
        Value2nameFilter as value2name,
        Selector
    } from 'vux'

export default {
  name: 'getval',
  directives: {
    TransferDom
  },
    data(){
        let queryObj = querystring.parse(location.hash.split("?")[1]);
        return {
            requestCode:decodeURIComponent(queryObj.requestCode||''),
            totalPremium:parseInt(decodeURIComponent(queryObj.totalPremium||'')*100),
            payOrderNo:decodeURIComponent(queryObj.payOrderNo||''),
            checkValue:'',
            payType:'',
            defaultValue: ['2支付宝移动端'],
            list: [['2支付宝移动端', '3微信扫码pc', '4支付宝PC']],
            radioValue:2,
            radioCheckList: [
                {
                key: '2',
                value: '支付宝移动端'
            },
                {
                key: '3',
                value: '微信扫码PC端'
            },
                {
                key: '4',
                value: '支付宝PC端'
            }
            ],
        }
    },
    components:{
        Group,Cell,Loading,XHeader,Flexbox, FlexboxItem,Radio,XInput,XButton,PopupPicker,CheckIcon,AlertModule, Alert,Selector, Popup,
    },
    methods:{
        ajaxPayQuery() {
            this.payType = this.radioValue;
            console.log("type=" + this.payType)
            var form = {
                "orderNo": this.payOrderNo,
                "payAmt": this.totalPremium,
                "payType": this.payType,
                "requestCode": this.requestCode
            };
//            this.$http.post('http://47.104.24.10:8765/insurance/cancer/getCheckValue', form).then(({data}) => {
            this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/cancer/getCheckValue', form).then(({data}) => {
                console.log(data)
                this.checkValue = data;
                form.checkValue = this.checkValue;
                console.log('form=' + JSON.stringify(form));
                if (form.payType != '' || form.payType != undefined || form.checkValue != '' || form.checkValue != undefined) {
                  this.formPost(process.env.anxinPayUrl, form)
//                  this.formPost('http://axwxtest.95303.com/axPay/pay/unusual', form)
//                    this.$http.post('http://axwxtest.95303.com/axPay/pay/unusual', form).then(({data}) => {
//                        console.log('data=' + data)
//                        console.log('支付成功')
//                    });
                } else {
                    console('支付失败')
                }
            });
        },
      formPost(url,params) {
        //参考：JS动态创建from表单 - CSDN博客  https://blog.csdn.net/cai_eternal/article/details/53454914
        var turnForm = document.createElement("form");
        //一定要加入到body中
        document.body.appendChild(turnForm);
        turnForm.method = 'post';
        turnForm.action = url;
        //turnForm.target = '_blank';

        for (var key in params) {
            var value=params[key];
            //创建若干隐藏表单域
            var newElement = document.createElement("input");
            newElement.setAttribute("name",key);
            newElement.setAttribute("value",value);
            newElement.setAttribute("type","hidden");
            turnForm.appendChild(newElement);
        }
        turnForm.submit();
    }
    },
    mounted(){
    }
}
</script>

<style lang="scss" >
  @function r($px){
    @return $px /2/18.75 * 1rem;
  }
  $BaseColor: #232323;
  $BaseFontSize: 0.95rem;
  $orangeColor: #FC9020;
  $halfBlackColor: #8c8c8c;
  $BaseLineHeight: 1.9rem;

  #get_val {
    height: 100%;
    color: $BaseColor;
      .vux-header{ font-size: 12px;
          .vux-header-title{margin: 0 20px;
          }
      }
      .vux-cell-value{font-size: $BaseFontSize;    font-weight: normal;
       margin-top: 0;
    }
      .weui-cells_radio .weui-check:checked + .weui-icon-checked{&:before{color:$orangeColor}}
      .vux-radio-label{line-height: $BaseLineHeight;font-size:$BaseFontSize }
      .weui-btn{&:after{border: none;}}
      .weui-btn_primary{background: $orangeColor}
      .weui-cells{
          margin-top: 0;
          &:before{display: none}
          &:after{display: none}
      }
    }
</style>
