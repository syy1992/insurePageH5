<template>
  <div id="exhibitionapply">    
    <div v-transfer-dom>
      <loading :show="isFetching" :text="'加载中...'"></loading>
    </div>
    
    <group class="plan-info-bar" :gutter=0>
      <div class="plan-info"><label class="plan-info-lable">所选方案：</label><span class="plan-info-content">{{planInfo}}展台方案</span></div>
      <div  v-if="false" class="plan-price">
        保费：{{planPrice}}
      </div>      
    </group>

<!--    <group :title='""' :gutter=10>
      <cell :title='"请选择单位类型"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>
      <radio :options="appTypes" v-model=appType></radio>
    </group>-->

    <group :title='""' :gutter=10>      
      <cell :title='"投保信息"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>
      <x-input title="单位名称" required placeholder="请输入单位名称" text-align='right' v-model="taxPayer" ></x-input>
      <!--<x-input title="单位名称" required placeholder="请输入单位名称" text-align='right' v-model="taxPayer" @on-focus="setFocus"></x-input>-->
      <x-input title="统一社会信用码" required placeholder="请输入统一社会信用码" text-align='right'  v-model="creditNo"></x-input>
      <x-input title="展会名称" required placeholder="请输入展会名称" v-model="exhibName" text-align='right'></x-input>
      <x-input title="展馆名称" required placeholder="请输入展馆名称" v-model="exhibHallName" text-align='right'></x-input>
      <x-address title="展会展馆地址"  :list="addressData" placeholder="请选择地址" v-model="addressProvince" ></x-address>
      <x-input title="展会展馆详细地址" required placeholder="展会展馆详细地址" v-model="address" text-align='right'></x-input>
      <x-input title="展位号" required placeholder="请输入展位号" v-model="boothNo" text-align='right'></x-input>
      <x-input title="参展商" required placeholder="请输入参展商" v-model="exhibitor" text-align='right'></x-input>
      <x-input title="搭建商" required placeholder="请输入搭建商" v-model="exhibitProducer" text-align='right'></x-input>
      <datetime v-model="startDate" format="YYYY-MM-DD"  title="保险起期"  :start-date='startDateNextDay'></datetime>
      <popup-picker title="保险期限" :data="dateList" :columns="1" v-model="value3" ref="picker3" v-if='planType<3'></popup-picker>
      <popup-picker title="保险期限" :data="dateList2" :columns="1" v-model="value3" ref="picker3" v-if='planType>2'></popup-picker>
      <!--<datetime v-model="endDate" format="YYYY-MM-DD"  title="保险止期"  ></datetime>-->
    </group>
    <group :title='""' :gutter=10>
      <cell :title='"请选择发票类型"'  class='sub'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>      
    <radio :options="receiptTypes" v-model=receiptType></radio>
    </group>
    <group :title='""' :gutter=10>
      <cell :title='"开票信息"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>
      <cell title="单位名称" primary="content" >{{taxPayer==null||taxPayer==""?"默认单位名称":taxPayer}}</cell>
      <x-input title="税号" required placeholder="请输入税号" text-align='right'  v-model="taxPayerCode" :is-type='this.tool.validateTaxNumber' ref='taxPayerCode'></x-input>
      <x-input v-if='receiptType==1' title="单位详细地址"  placeholder="请输入单位地址" v-model="taxPayerAddress" text-align='right'></x-input>
      <x-input v-if='receiptType==1' title="单位电话"  keyboard="number" type='tel'  placeholder="请输入电话号码" v-model="taxPayerPhone" text-align='right'  is-type="china-mobile"></x-input>
      <x-input v-if='receiptType==1' title="开户银行"  placeholder="请输入开户银行" v-model="taxPayerBankName" text-align='right'></x-input>
      <x-input v-if='receiptType==1' title="银行账号"  placeholder="请输入银行账号" keyboard="number" type='tel' v-model="taxPayerBankNo" text-align='right' :is-type="this.tool.validateBankCard"></x-input>
      <x-input  title="发票接收地址" required placeholder="请输入发票接收地址" v-model="receiveAddress" text-align='right'></x-input>
      
    </group>
    <group :title='""' :gutter=10>
      <cell :title='"联系方式"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell> 
      <x-input title="联系人" required placeholder="请输入联系人" text-align='right' v-model="contactName"></x-input>
      <x-input title="联系电话" type='tel' required  keyboard="number" is-type="china-mobile" placeholder="请输入联系电话" text-align='right'  v-model="contactPhone" ref='contactPhone'></x-input>
      <x-input title="联系邮箱"  is-type="email" required placeholder="请输入联系邮箱" text-align='right'  v-model="contactEmail" ref='contactEmail'></x-input>
    </group>
    <div class="plan-picker-wrap clause_confirm">
      <check-icon :value.sync="ischeck"> </check-icon>
      <span style='line-height: 1.5rem;font-size: 0.82rem'>我已认真阅读、理解并接受<a class='link' @click='showDesc=true'>《投保声明》</a>尤其是其中免除保险人责任的条款。 </span>
    </div>

    <group :gutter=0>
    <flexbox :gutter="0" class="oprations">
      <flexbox-item :span="2/5" :order="1"><div class="plan-price">￥ {{planPrice}}</div></flexbox-item>
      <flexbox-item  :order="3"><div class="plan-buy" @click="applyExbition">立即投保</div></flexbox-item>      
    </flexbox>
      <x-button v-if="false" type="primary" @click.native=applyExbition>确认</x-button>            
    </group>
    <div v-transfer-dom>
      <popup v-model="showDesc" position="bottom" max-height="50%">
          <div class='divstyle'>
            <p  class='pstyle'>投保声明</p>
            <p style='font-size: 0.8rem;margin: 5px 0;    line-height: 20px;'><span  class='ac'><label>投保声明</label></span></p>
            <p>本人已详细阅读<a href='https://www.supplyfintech.com/insurance_clause/exhibit_risks_01.pdf' class='link'>《保险条款》</a>和保险公司偿付能力声明等内容尤其对其中免除保险人责任的条款（包括但不限于责任免除条款、免赔额、免赔率、比例赔付或者给付等免除或者减轻保险人责任的条款）
              已充分理解并接受，同意以此作为订立保险合同的依据。上述所填写的内容及其他本人所填投保资料均为保险合同的重要组成部分，均属事实。</p>
            <p  style='font-size: 0.8rem;margin: 5px 0;    line-height: 20px;'><span  class='ac'><label>保险公司偿付能力声明</label></span></p>
            <p >本公司最近季度的综合偿付能力充足率为279.7%，偿付能力充足率和风险综合评级均达到监管要求。</p>
            <x-button type="warn" @click.native="showDesc = false" >确认</x-button>
          </div>
      </popup>
    </div>
  </div>
</template>
<script>


import {
    CheckIcon,
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
  Datetime,
//  ChinaAddressV4Data,
  Value2nameFilter as value2name,
  XAddress,
  PopupPicker,Popup
  } from 'vux'
import ChinaAddressData from '../../../static/js/china_address.js'
export default {
  name: 'exhibitionapply',
  directives: {
    TransferDom
  },
  data(){
    return {
        ischeck:false,
        showDesc:false,
        picSrc: require('../../../static/images/icon.png'),
        isFetching: false,
        appTypes: [{key: 1, value: '搭建商'}, {key: 2, value: '参展商'}],
        appType: 1,
        taxPayer: '',//公司名称
        creditNo: '',//统一信用码
        contactName: "",//联系人姓名，
        contactPhone: "",//联系人电话
        contactEmail: '',//联系人邮箱
        exhibName: '',//展会名称
        exhibHallName: '',//展馆名称
        address: '',//展馆地址
        boothNo: '',//展馆编号
        taxPayerCode: '',//纳税人编号
        addressData: ChinaAddressData.china_address,
        addressProvince: [],//N纳税人省级地址
        taxPayerAddress: '',//纳税人地址
        taxPayerPhone: '',//n纳税人电话
        taxPayerBankName: '',//开户行
        taxPayerBankNo: '',//开户行账号
        receiveAddress: '',//收票地址
        startDate: '',
//        endDate:'',
        startDateNextDay: '',
        exhibitor: '',//参展商
        exhibitProducer: '',//搭建商
        receiptTypes: [{key: 2, value: '普票'}, {key: 1, value: '专票'}],
        receiptType: 2,
        planNo: querystring.parse(location.search.substr(1)).planNo || '',//方案编号,
        planPrice: decodeURIComponent(querystring.parse(location.search.substr(1)).planprice || ''),//方案价格,
        planInfo: decodeURIComponent(querystring.parse(location.search.substr(1)).planinfo || ''),//方案信息,
        planType: decodeURIComponent(querystring.parse(location.search.substr(1)).planType || ''),//控制类型的0-4,
        dateList:[
            {name: '1天',value: '1天'},
            {name: '2天',value: '2天'},
            {name: '3天',value: '3天'},
            {name: '4天',value: '4天'},
            {name: '5天',value: '5天'},
            {name: '6天',value: '6天'},
            {name: '7天',value: '7天'},
            {name: '8天',value: '8天'},
            {name: '9天',value: '9天'},
            {name: '10天',value: '10天'},
            {name: '11天',value: '11天'},
            {name: '12天',value: '12天'},
            {name: '13天',value: '13天'},
            {name: '14天',value: '14天'},
            {name: '15天',value: '15天'},
            {name: '16天',value: '16天'},
            {name: '17天',value: '17天'},
            {name: '18天',value: '18天'},
            {name: '19天',value: '19天'},
            {name: '20天',value: '20天'},
            {name: '21天',value: '21天'},
            {name: '22天',value: '22天'},
            {name: '23天',value: '23天'},
            {name: '24天',value: '24天'},
            {name: '25天',value: '25天'},
            {name: '26天',value: '26天'},
            {name: '27天',value: '27天'},
            {name: '28天',value: '28天'},
            {name: '29天',value: '29天'},
            {name: '30天',value: '30天'},
        ],
        dateList2:[
            {name: '1天',value: '1天'},
            {name: '2天',value: '2天'},
            {name: '3天',value: '3天'},
            {name: '4天',value: '4天'},
            {name: '5天',value: '5天'},
            {name: '6天',value: '6天'},
            {name: '7天',value: '7天'},
            {name: '8天',value: '8天'},
            {name: '9天',value: '9天'},
            {name: '10天',value: '10天'},
            {name: '11天',value: '11天'},
            {name: '12天',value: '12天'},
            {name: '13天',value: '13天'},
            {name: '14天',value: '14天'},
            {name: '15天',value: '15天'},
        ],
        value3:['10天']
    }
  },
  components:{
      CheckIcon,Group,Cell,Loading,Flexbox, FlexboxItem,Radio,XInput,XButton,XAddress,Datetime,PopupPicker,Popup
  },
  methods:{
    /*提交 方案*/
    applyExbition:function(){  
       // debugger
      /*配置信息相关*/
      var that = this;  
      var reqTid = new Date().getTime();
      var account = process.env.exhibitionAccount
      var privateKey = process.env.exhibitionPrivateKey
      /*配置信息相关*/
        if (!this.taxPayer) { this.showToast('单位名称不能为空'); return false; }
        if (!this.creditNo) { this.showToast('统一社会信用码不能为空'); return false;}
        if (!this.exhibName) { this.showToast('展会名称不能为空'); return false;}
        if (!this.exhibHallName) { this.showToast('展馆名称不能为空'); return false;}
        if (!this.addressProvince.length) { this.showToast('展会展馆地址不能为空'); return false;}
        if (!this.address) { this.showToast('展会展馆详细地址不能为空'); return false;}
        if (!this.boothNo) { this.showToast('展位号不能为空'); return false;}
        if (!this.exhibitor) { this.showToast('参展商不能为空'); return false;}
        if (!this.exhibitProducer) { this.showToast('搭建商不能为空'); return false;}
        if (!this.taxPayerCode) { this.showToast('税号不能为空'); return false;}
        if(this.$refs.taxPayerCode.valid!= true){this.showToast('税号必须为数字和英文'); return false; }
        if (!this.receiveAddress) { this.showToast('发票接收地址不能为空'); return false;}
        if (!this.contactName) { this.showToast('联系人不能为空'); return false;}
        if (!this.contactPhone) { this.showToast('联系电话不能为空'); return false;}
        if(this.$refs.contactPhone.valid!= true){this.showToast('联系电话格式错误'); return false; }
        if (!this.contactEmail) { this.showToast('联系邮箱不能为空'); return false;}
        if(this.$refs.contactEmail.valid!= true){this.showToast('联系邮箱格式错误'); return false; }
        if (!this.ischeck) { this.$vux.toast.show({
                text: '请阅读投保须知', type: 'text',
                onHide () {
                    // 使用定时器是为了让滑动时更加自然
                    that.scroll('clause_confirm');
                }
            }); return false;
        }else{
            var userData= {
                "account": account,
                "reqTid": reqTid,
                "sign": sign,
                "data":
                    JSON.stringify(
                        {
                            applicant:{
                                type:1,
                                legalPerson:{
                                    name:that.taxPayer,
                                    creditNo:that.creditNo,
                                    phone:that.taxPayerPhone,
                                    contactMan:that.contactName,
                                    contactPhone:that.contactPhone,
                                }
                            },
                            extendInfo:{
                                exhibName:that.exhibName,//展会名称
                                appType:that.appType,//投保单位类别,
                                exhibHallName:that.exhibHallName,//展馆名称,
                                address:value2name(this.addressProvince,ChinaAddressData.china_address) + ' '+that.address,//展会/展馆地址,
                                boothNo:that.boothNo,//展位编号
                                receiptType:that.receiptType,//1专票 2普票
                                taxPayer:that.taxPayer,//与投保单位一致，
                                taxPayerCode:that.taxPayerCode,//税号，
                                taxPayerAddress:that.taxPayerAddress,//纳税人地址，//fixme
                                taxPayerPhone:that.taxPayerPhone,//纳税人电话  //fixme
                                taxPayerBankName:that.taxPayerBankName,//开户行 //fixme
                                taxPayerBankNo:that.taxPayerBankNo,///银行卡号  //fixme
                                receiveAddress:that.receiveAddress,//发票接收地址,
                                contactName:that.contactName,
                                contactPhone:that.contactPhone,
                                startDate:that.startDate,
//                            endDate:that.endDate,
                                exhibitor:that.exhibitor,//参展商
                                exhibitProducer:that.exhibitProducer,//搭建商
                                insureDays:parseInt(that.value3)
                            },
                            commonInfo:{
                                platNo:account,//url上面取，
                                planNo:that.planNo,//产品方案编号
                                isGroup:0,
                                appInsRelation:"0",
                                insBenRelation:"0",
                                num:1
                            }
                        }
                    )

            };

            var sign = md5("account"+account+"data"+userData.data+"reqTid"+reqTid+privateKey).toString().toUpperCase();
            userData.sign = sign;
            this.isFetching = true;
            this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/exhib/apply',userData).then(({data}) => {
                switch(data.resCode){
                    case '0000'://成功
                        this.isFetching = false;
                        let proposalNo= JSON.parse(data.data).appReturnInfo.proposalNo;
                        let payurl = '/page/exhibitionPay?planNo='+querystring.parse(location.search.substr(1)).planNo||''+'&platNo='+querystring.parse(location.search.substr(1)).platNo||'';
                        payurl=payurl+'&planPrice='+encodeURIComponent(parseInt(this.planPrice))+'&planInfo='+encodeURIComponent(this.planInfo)+'&proposalNo='+proposalNo;
                        window.open(payurl,'_self');
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
                // this.$http.post('http://127.0.0.1:8765/insurance/exhib/apply',userData).then(({data}) => {

            });
        }

    },
    backTop:function(){
      document.body.scrollTop = 0;
    },
      scroll(name){
          let domName=name;
          setTimeout(()=>{
              let className= document.getElementsByClassName(domName)[0];
              className.scrollTop = 0;
              className.scrollIntoView(true);
          },200)
      },
/*    setFocus:function(){
      this.$refs.taxPayer.focus();
    },*/
      getNextDateFn(){
          let date = new Date();
          let next=  this.tool.dateAddDay(date,1);//date 类型的
          this.startDateNextDay= this.tool.formatDate(next)
      },
      showToast(text){
          this.$vux.toast.show({
              text: text,
              type:'text',
              width:'10em'
          });
      },
  },
  created(){
  },
  mounted(){
      this.getNextDateFn(); //次日
      this.$nextTick(function () {
          this.startDate=this.startDateNextDay;
      });
  }
}
</script>

<style lang="scss">
@function r($px){
  @return $px /2/18.75 * 1rem;
}
$OperatorHeight:3rem;
$BaseFontSize:0.95rem;
$otherFontSize:1rem;
$smallFontSize:0.85rem;
$baseHeight:1.9rem;
$BaseLineHeight:1.9rem;
$redColor: #ff4200;
#exhibitionapply{
  .plan-info-bar{
    // position: fixed
  }
  .plan-info{
    padding: 10px 15px;
    .plan-info-lable{
      font-size: 1.25rem;
    }    
    .plan-info-content{ }
  }
  .weui-cells{
    font-size: $BaseFontSize;
    margin-top:0;
  }
  .back-top{
    border: 2px solid #bfbfbf;    
    border-radius:50% ;
    font-weight: 200; 
    text-align:center;
    width: 2rem;
    height: 2rem;
    display: inline-block;
    position: fixed;
    right: 1rem;
    bottom: 2.5rem;
    z-index: 999;
    .vux-x-icon{
      fill: #666;
    }
    img{
      margin-top: 5px;
    width: 20px;
    /* vertical-align: top; */
    height: 20px;
    }
  }
  .oprations{    
    position: fixed;
    height: $OperatorHeight;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    div{
      font: normal $otherFontSize normal;
      color: #fff;
      height: $OperatorHeight;
      line-height: $OperatorHeight;
      text-align: center;
    }
    .plan-price{
      background-color: #FFF;
      color: #ff4200;      
      line-height: $OperatorHeight;
    }
    .plan-share{      
      background-color: #ffb938;      
      letter-spacing: 0.01rem;
    }
    .plan-buy{            
      background-color: #ff4200;    
      letter-spacing: 0.01rem;
    }
  }
  .weui-input{line-height: 1.9rem}
  .weui-label{line-height: 1.9rem}
  .sub:after {
    content: " ";
    position: absolute;
    left: 15px;
    right: 0;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .vux-label{line-height: $baseHeight}
  .plan-picker-wrap{
    padding: 15px;font-size: $smallFontSize;text-align: justify;line-height: 20px;margin-bottom: 3rem;
    .link{color:#68a6f5;font-size:$smallFontSize}
    .weui-icon-circle{font-size: 16px;}
    .vux-check-icon {
      float:left;
      span {
        line-height: 16px;
      }
      .weui-icon-success-circle{
        &:before {
          color: #ff4200;
        }
      }
      .weui-icon-success{&:before {
        color: #ff4200;
      }}
    }
    .weui-icon-success {
      font-size: 16px;
      color:red;
    }

  }
}
.weui-toast_text{
  .weui-toast__content {
    font-size: 0.9rem;
  }
}

.divstyle{
  font-size: 0.7rem; text-align: left;color: #666;background: #ffffff;
  margin-top: 0;
  padding-bottom: 15px;
  p{
    line-height:1.3rem;padding: 0 15px;
    .link {
      color: #68a6f5;
    }
  }
  .ac{
    position: relative;
    height:20px;
    line-height:20px;
  &:after{
    content:'' ; border-top: 20px solid rgba(255, 0, 0, 0.1);width: 100%;position: absolute;top:-3px;left:-15px;border-top-right-radius:10px; border-bottom-right-radius:10px;padding-right: 25px;
  }
    label{
      height:20px;
      line-height:20px;
    }
  }
  .pstyle{
    line-height: 2.2rem;
    height: 2.2rem;
    font-size: $BaseFontSize;
    text-align: center;
    background:$redColor;
    margin-bottom: 10px;
    color: #fff;
  }
  .weui-btn{margin: 15px auto 0;font-size: 0.9rem;    width: 80%;}
  .weui-btn_warn{background: $redColor}
  .weui-cell{
    .vux-cell-bd{
      p{
        .vux-label{font-size:0.8rem;}
      }
    }
  }
}
.close{
  position: absolute;
  /*right: 15px;*/
  width: 100%;
  top: 0;
  font-size: 20px;
  /*width: 30px;*/
  height: 30px;
  background: #ccc;
  text-align: right;
  z-index: 1000;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
}
</style>
