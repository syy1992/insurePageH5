<template>
  <div id="applicant">
    <div v-transfer-dom>
      <loading :show="isFetching" :text="'加载中...'"></loading>
    </div>
    <div class="plan-info" ref='ul'>
      <div style='padding: 10px 15px'>
        <div class="plan-info-lable">已选择保障计划</div>
        <div class="plan-info-content">
          <span>保障方案：{{planInfo}}</span>
          <!--<span>保费：{{planPrice}}元</span>-->
        </div>
      </div>
    </div>

    <group :title='""' :gutter=70>
      <cell :title='"投保人信息"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <x-input title="姓名" required placeholder="请输入姓名" text-align='left' v-model="applicantName" ref='applicantName' class="applicantNameClass"></x-input>
      <x-input title="身份证号" required placeholder="请输入身份证号" text-align='left'  v-model="applicantIdCard" :is-type="validateIdCard" ref="applicantcid" class="applicantIdCardClass"></x-input>
      <x-input title="电话号码" keyboard="number" required placeholder="请输入电话号码" text-align='left'  v-model="applicantPhone" is-type="china-mobile" class="applicantPhoneClass"></x-input>
      <x-input title="邮箱" required placeholder="请输入邮箱" text-align='left'  v-model="applicantMail" is-type="email" class="applicantMailClass"></x-input>
      <popup-picker title="性别"    :data="sexArr" v-model="radioValueSex" value-text-align="left" placeholder="请选择" class="radioValueSexClass"></popup-picker>
    </group>
    <group :title='""' :gutter=10>
      <cell :title='"被保人信息"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <popup-picker title="与投保人关系"    :data="list" v-model="assured" value-text-align="left" @on-change='changeRelationPicker'></popup-picker>
      <!--<popup-picker title="与投保人关系"  :data="list" v-model="assured" value-text-align="right" @on-change='assured=="本人"?isShow=false:isShow=true' ></popup-picker>-->
      <x-address title="家庭住址" required v-model="address" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" :is-type="isAddress"></x-address>
      <x-input title="详细住址" required placeholder="请输入详细住址" text-align='left' v-model="addressDetail" class="addressDetailClass"></x-input>
      <x-input title="邮编"  required placeholder="请输入邮编" text-align='left' v-model="propertyZip" :is-type="codeValue" class="propertyZipClass"></x-input>
    </group>

    <group :title='""' :gutter=0 class='insuredInfo' v-show='isShow'>
      <x-input title="姓名" required placeholder="请输入姓名" text-align='left' v-model="insuredName" class="insuredNameClass"></x-input>
      <x-input title="身份证号" required placeholder="请输入身份证号" text-align='left'  v-model="insuredIdCard" :is-type="validateIdCard"  ref="insuredcid" class="insuredIdCardClass"></x-input>
      <x-input title="电话号码"  keyboard="number" required placeholder="请输入电话号码" text-align='left'  v-model="insuredPhone" is-type="china-mobile" class="insuredPhoneClass"></x-input>
      <x-input title="邮箱" required placeholder="请输入邮箱" text-align='left'  v-model="insuredMail" is-type="email" class="insuredMailClass"></x-input>
      <popup-picker title="性别"   :data="sexArr" v-model="radioValueSex2" value-text-align="left"  placeholder="请选择"></popup-picker>
      <!--<popup-picker title="性别"   :data="sexArr" v-model="radioValueSex2" value-text-align="right" @on-change='changeSex(radioValueSex2,sexNumber2)'></popup-picker>-->
    </group>
    <group :title='""' :gutter=10>
      <x-input title="推荐码"  placeholder="请输入推荐码（电话号码）" text-align='left' v-model="recommendCode" class="recommendCodeClass" is-type="china-mobile"></x-input>

    </group>

    <div class="clause_confirm" >
           <check-icon :value.sync="ischeck"> </check-icon>
            <span style='line-height: 1.5rem;font-size: 0.82rem;'>我已认真阅读<a class='a_link'>《投保须知》</a>并同意上述协议约定</span>
          <p class='t-source'>投保须知：每个家庭地址限购一份，多买无效。</p>
    </div>
    <flexbox :gutter="0" class="oprations">
      <flexbox-item :order="1"  :span="1/6">
        <div class="plan-desc"  style='text-align: right'>保费：</div>
      </flexbox-item>
      <flexbox-item :span="1/3" :order="1" >
        <div class="plan-price" style='text-align: left'>￥ {{planPrice}}.00</div>
      </flexbox-item>
      <flexbox-item :order="2">
        <div class="plan-buy"   @click="jiacaiApply">立即投保</div>
      </flexbox-item>
    </flexbox>

  </div>
</template>
<script>

import {
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
    XAddress,
    PopupPicker,
    CheckIcon,
    Value2nameFilter as value2name,
        Selector
    } from 'vux'
import ChinaAddressData from '../../../static/js/china_address.js'
  export default {
  name: 'applicant',
  directives: {
    TransferDom
  },
  data(){
    return {
        isFetching:false,
        ischeck:true,
        isShow:false,
        assured: ['本人'],
        relationNumber:0,
        list: [[]],
        copyUserData:null,
        relationData: [
                {'label':'-1','value':'法定'},
                {'label':'0','value':'本人'},
                {'label':'112','value':'丈夫'},
                {'label':'123','value':'妻子'},
                {'label':'214','value':'父亲'},
                {'label':'225','value':'母亲'},
                {'label':'316','value':'儿子'},
                {'label':'327','value':'女儿'},
                {'label':'9','value':'其他'},
        ],
//        platNo:querystring.parse(location.href.substr(1)).platNo,//平台编号
        planNo:decodeURIComponent(querystring.parse(location.search.substr(1)).planNo||''),//方案编号,
        planPrice:decodeURIComponent(querystring.parse(location.search.substr(1)).planprice||''),//方案价格,
        planInfo:decodeURIComponent(querystring.parse(location.search.substr(1)).planinfo||''),//方案信息,
        applicantName:'',//投保人
        applicantIdCard:'',//身份证
        applicantPhone:"",//投保人电话
        applicantMail:'',//邮箱

        insuredMail:'',//被保人邮箱
        insuredPhone:'',//被保人电话
        insuredIdCard:'',
        insuredName:'',

        recommendCode:'',
        addressData: ChinaAddressData.china_address,
        address: [],//地址
        addressDetail:'',
        propertyZip:'',//邮编
        radioValueSex: ['男'],//投保人性别默认
        radioValueSex2: ['男'],//被保人性别默认
        sexArr: [[]],
        sexData: [
            {'label':'1','value':'男'},
            {'label':'2','value':'女'},
        ],
        sexNumber:1,
        sexNumber2:1,
        xinputFieldArr:["applicantName","applicantIdCard","applicantPhone","applicantMail","addressDetail","propertyZip","insuredName","insuredIdCard","insuredPhone","insuredMail","recommendCode",],
        timeTag:9999999999000,
    }
  },
  components:{
    Group,Cell,Loading,Flexbox, FlexboxItem,Radio,XInput,XButton,/*ChinaAddressData,*/ XAddress,PopupPicker,CheckIcon,/*AlertModule, Alert,*/Selector
  },
  methods:{
      saveInfo(){
       let jsonData=
          {
          'applicantName':this.applicantName,
          'applicantIdCard':this.applicantIdCard,
          'applicantPhone':this.applicantPhone,
          'applicantMail':this.applicantMail,
          'radioValueSex':this.radioValueSex,
          'assured':this.assured,
          'address':this.address,
          'addressDetail':this.addressDetail,
          'propertyZip':this.propertyZip,
          'insuredName':this.insuredName,
          'insuredIdCard':this.insuredIdCard,
          'insuredPhone':this.insuredPhone,
          'insuredMail':this.insuredMail,
          'email':this.insuredMail,
          'radioValueSex2':this.radioValueSex2,
         'recommendCode':this.recommendCode
      };
        let  strJson=JSON.stringify(jsonData);
        sessionStorage.setItem('strJson',strJson);

},
getInfo(){
    let strJson=sessionStorage.getItem('strJson');

    if(strJson==''||strJson==null||strJson==undefined){
        return ;
    }
    let jsonData=JSON.parse(strJson);
    this.applicantName=jsonData.applicantName;
    this.applicantIdCard=jsonData.applicantIdCard;
    this.applicantPhone=jsonData.applicantPhone;
    this.applicantMail=jsonData.applicantMail;
    this.radioValueSex=jsonData.radioValueSex;
    this.assured=jsonData.assured;
    this.address=jsonData.address;
    this.addressDetail=jsonData.addressDetail;
    this.propertyZip=jsonData.propertyZip;
    this.insuredName=jsonData.insuredName;
    this.insuredIdCard=jsonData.insuredIdCard;
    this.insuredPhone=jsonData.insuredPhone;
    this.insuredMail=jsonData.insuredMail;
    this.email=jsonData.email;
    this.radioValueSex2=jsonData.radioValueSex2;
    this.recommendCode=jsonData.recommendCode;
},

      changeRelationPicker(val){
          this.assured=='本人'?this.isShow=false:this.isShow=true;
          for(let i in this.relationData){
              let label=  this.relationData[i].label;
              let value=  this.relationData[i].value;
              if(this.assured==value){
                  this.relationNumber=label;//要提交的是数字类型 this.relationNumber
              }
          }
      },
      //初始化关系列表
      initRelation(){
          for(let i in this.relationData){
              let  value=  this.relationData[i].value;
              this.list[0].push(value)
          }
      },
      //初始化性别列表
      initSex(){
          for(let i in this.sexData){
              let  value=  this.sexData[i].value;
              this.sexArr[0].push(value)
          }
      },

    /*提交 方案*/
    jiacaiApply(){
      /*配置信息相关*/
        var that = this;
        var reqTid = new Date().getTime();
        var account = process.env.jiacaiAccountA;
        var privateKey = process.env.jiacaiAPrivateKey;

      console.log('account='+account)
      /*配置信息相关*/
        var userData= {
            "account": account,
            "reqTid": reqTid,
            "sign": sign,
            "data":JSON.stringify(
                {
                    applicant: {
                        type: '0',
                        naturePerson: {
                            name: this.applicantName,
                            paperworkType: "01",//证件类型 默认身份证
                            paperworkNo: this.tool.idcardConvert(this.applicantIdCard),
                            phone: this.applicantPhone,
                            mail: this.applicantMail,
                            sex: this.sexNumber,
                        },
                    },
                    insuredList: [{
                      /*  insured: {*/
                            type: '0',
                            naturePerson: {
                                name: this.insuredName,
                                paperworkType: "01",
                                paperworkNo: this.tool.idcardConvert(this.insuredIdCard),
                                phone: this.insuredPhone,
                                mail: this.insuredMail,
                                sex: this.sexNumber2,
                            },
                       /* }*/
                    }],
                    beneficiaryList: [],//受益人
                    extendInfo: {
                        insPeriod: '365',
                        propertyAddress: value2name(this.address, this.addressData) + ' ' + this.addressDetail,
                        propertyZip: this.propertyZip,
                        premium: this.planPrice,
                    },
                    commonInfo: {
                        platNo: account,//平台编号
                        planNo: this.planNo,//产品方案编号
                        saleNo: this.recommendCode,//业务员编号推荐码
                        isGroup: '0',
                        appInsRelation: this.relationNumber,//投保人被保险人关系
                        insBenRelation: '0',//被保险人受益人关系
                        num: '1',//投保份数
//              chanNo: '',//渠道编号（y）
//              saleNo: "",//业务员（y）
//              isAppInsSame: 0,//投保人是否为被保险人
//              isInsBenSame: 1,//被保险人是否为受益人
                    }
                }
             )
        };
        var sign = md5("account"+account+"data"+userData.data+"reqTid"+reqTid+privateKey).toString().toUpperCase();
        userData.sign = sign;
        for(let i in this.sexData){
            let label=  this.sexData[i].label;
            let value=  this.sexData[i].value;
            if(this.radioValueSex==value){
                this.sexNumber=label//要提交的是数字类型
            }
            if(this.radioValueSex2==value){
                this.sexNumber2=label;//要提交的是数字类型
            }
        };
        //深拷贝 提交data内容
        this.copyUserData=JSON.parse(JSON.stringify(userData));
        this.validateInputVal();
    },
      //校验
      validateInputVal(){
//          console.log('this.copyUserData'+this.copyUserData.data.policyInfos[0].insuredInfo.type)
          //this.relationNumber==0 投保人为本人
          var that=this;
           let  applicantIdCard=this.tool.idcardConvert(this.applicantIdCard)
          if(this.relationNumber==0){

              if(!this.applicantName){
                  this.showToast('投保人姓名不能为空')
                  return false;
              }else if(!this.applicantIdCard){
                  this.showToast('投保人身份证号不能为空')
                  return false;
              }else if(this.$refs.applicantcid.valid == false) {
                  this.showToast('投保人身份证格式不正确')
                  return false;
              }else if(!this.applicantPhone){
                  this.showToast('投保人电话号码不能为空')
                  return false;
              }else if(!this.applicantMail){
                  this.showToast('投保人邮箱不能为空')
                  return false;
              }else if(this.address.length==0){
                  this.showToast('请选择家庭住址')
                  return false;
              }else if(!this.addressDetail){
                  this.showToast('详细住址不能为空')
                  return false;
              }else if(!this.propertyZip){
                  this.showToast('邮编不能为空')
                  return false;
              }else if (!this.ischeck) {
                  this.$vux.toast.show({
                      text: '请阅读投保须知',
                      type:'text',
                      onHide () {
                          that.scroll('clause_confirm')
                      }
                  });
                  return;
              }else {
                  this.ajaxApplyQuery()
              }

          }else{
              if(!this.applicantName){
                  this.showToast('投保人姓名不能为空')
                  return false;
              }else if(!this.applicantIdCard){
                  this.showToast('投保人身份证号不能为空')
                  return false;
              }else if(this.$refs.applicantcid.valid == false) {
                  this.showToast('投保人身份证格式不正确')
                  return false;
              }else if(!this.applicantPhone){
                  this.showToast('投保人电话号码不能为空')
                  return false;
              }else if(!this.applicantMail){
                  this.showToast('投保人邮箱不能为空')
                  return false;
              }else if(this.address.length==0){
                  this.showToast('请选择家庭住址')
                  return false;
              }else if(!this.addressDetail){
                  this.showToast('详细住址不能为空')
                  return false;
              }else if(!this.propertyZip){
                  this.showToast('邮编不能为空')
                  return false;
              }else if(!this.insuredName){
                  this.showToast('被保人姓名不能为空')
                  return false;
              }else if(!this.insuredIdCard){
                  this.showToast('被保人身份证号不能为空')
                  return false;
              }else if(this.$refs.insuredcid.valid == false) {
                  this.showToast('被保人身份证格式不正确')
                  return false;
              }else if(!this.insuredPhone){
                  this.showToast('被保人电话号码不能为空')
                  return false;
              }else if(!this.insuredMail){
                  this.showToast('被保人邮箱不能为空')
                  return false;
              }if (!this.ischeck) {
                  this.$vux.toast.show({
                      text: '请阅读投保须知',
                      type:'text',
                      onHide () {
                          that.scroll('clause_confirm')
                      }
                  });
                  return;
              }else {
                  this.ajaxApplyQuery()
              }
          }

      },

      showToast(text){
          this.$vux.toast.show({
              text: text,
              type:'text',
              width:'10em'
          });
      },
      //发出投保请求
      ajaxApplyQuery(){
          this.isFetching = true;//show loading
          this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/kunlunGasRisk/apply',this.copyUserData).then(({data}) => {
              switch(data.resCode){
                  case '0000'://成功
                      this.isFetching = false;
                  console.log(data)
                      if(data.data.result=='1'){
                          let applyurl = data.data.payUrl;
                          window.open(applyurl,'_self');
                      }
                      break;
                  case '1001'://账号不存在或被禁用
//                      this.showToast('账号不存在或被禁用')
                      this.showToast( data.resMsg )
                      break;
                  case '1002'://
                      this.isFetching = false;
//                      this.showToast('参数为空或格式错误')
                      this.showToast( data.resMsg )
                      break;
                  case '1003'://必填写项为空
                      this.isFetching = false;
//                      this.showToast('必填写项为空')
                      this.showToast( data.resMsg )
                      break;
                  case '1004'://验签失败
                      this.isFetching = false;
//                      this.showToast('验签失败')
                      this.showToast( data.resMsg )
                      break;
                  case '9999'://系统异常
                      this.isFetching = false;
//                      this.showToast('系统异常')
                      this.showToast( data.resMsg )
                      break;
                  default:
              }
          });
      },
      scroll(name){
          let domName=name;
          setTimeout(()=>{
              let className= document.getElementsByClassName(domName)[0];
              className.scrollTop = 0;
              className.scrollIntoView(true);
          },200)
      },

      //邮编
      codeValue(value){
          let reg=/^\d{6}$/;
          let regResult=reg.test(value);
          return {
              valid: regResult=== true,
              msg: "编码必须为6位数字!"
          }
      },
      //地址校验
      isAddress(value){
          return {
              valid: value.length===0,
              msg: "必须选项!"
          }
      },
      //校验身份证
      validateIdCard(idCard){
          //15位和18位身份证号码的正则表达式
          let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
          let regResult=regIdCard.test(idCard)
          //如果通过该验证，说明身份证格式正确，但准确性还需计算
          let msg=''
          if(regResult){
              if(idCard.length==18){
                  var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
                  var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                  var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
                  for(var i=0;i<17;i++){
                      idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
                  }

                  var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
                  var idCardLast=idCard.substring(17);//得到最后一位身份证号码

                  //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                  if(idCardMod==2){
                      if(idCardLast=="X"||idCardLast=="x"){
                          console.log("恭喜通过验证啦！");
//                        msg="恭喜通过验证啦！"
                      }else{
                          console.log("身份证号码错误！");
                          msg="身份证号码错误！"
                      }
                  }else{
                      //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                      if(idCardLast==idCardY[idCardMod]){
                          console.log("恭喜通过验证啦！");
                      }else{
                          msg="身份证号码错误！"
                      }
                  }
              }
          }else{
              msg="身份证格式不正确！"
              console.log("身份证格式不正确!");

          };
          return {
              valid: regResult === true,
              msg: msg
          }
      },
      //检查数据与视图是否一致（仅针对x-input输入框）。
      checkDateViewIdentical(){
          var oldTime=this.timeTag;
          var newTime=new Date().getTime();
          var interval = newTime - oldTime;
          this.timeTag=newTime;
          if(interval>1600){
              return false;
          }
          return true;

      },
      //获取某x-input dom元素的value。使用原生js操作dom方式
      getXinputDomValue(xinputClassName){
          return document.getElementsByClassName(xinputClassName)[0].getElementsByClassName("weui-input")[0].value;
      },
      //强制从数据同步到view。做法是针对每一个x-input，先将v-model绑定的数据设为空字符串，再使用$nextTick 在视图更新后的回调中 将其设为原值
      forceData2View(xinputClassName){
          let that=this;
          let tmp={}  //用于保存旧值
          for(let index in this.xinputFieldArr){
              let field=this.xinputFieldArr[index]
              //旧值保存到tmp.xxx
              tmp[field]=this[field]
              //值设为空字符串
              this[field]=""
          }

          //稍后视图更新后，立即设置回旧值
          this.$nextTick(function () {
              for(let index in that.xinputFieldArr){
                  let field=this.xinputFieldArr[index]
                  this[field]=tmp[field]
              }
          });

      },
        // 解决iOS端浏览器后退后，x-input输入框数据与视图不同步的问题。由于iOS浏览器中，页面跳转后，再后退到本页面，view中x-input的输入内容被清空，但data中数据正常，此时data与view不同步，如果点击input则内容会立即显示出。
      // 此处使用定时器检查这种不同步的情况，如果有则触发从data到view的同步
      fixIosInputBlank(){
          let that=this;
              setInterval(function () {
                  if(that.checkDateViewIdentical()){
                      return
                  }
                  //强制从数据同步到view
                  that.forceData2View();
              },1000)
      },

  },

  mounted(){
      this.initRelation();
      this.initSex();
      this.getInfo();
      let that=this;
          window.onbeforeunload = function (e) {
              console.log("onbeforeunload");
              that.saveInfo()
              console.log("onbeforeunload2");
          }
            //iOS浏览器中，页面跳转后，再后退到本页面，view中x-input的输入内容被清空，但data中数据正常，此时data与view不同步。使用此方法解决
          this.fixIosInputBlank()
      }

}
</script>

<style lang="scss" >
@function r($px){
  @return $px /2/18.75 * 1rem;
}
$OperatorHeight:3rem;
$BaseColor: #232323;
$orangeColor: #FC9020;
$halfBlackColor: #8c8c8c;
$BaseFontSize: 0.95rem;
$BaseLineHeight: 1.9rem;
$otherFontSize: 0.8rem;
$buttonFontSize: 1rem;

#applicant .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
  color: $orangeColor;

}
#applicant .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
  color: $orangeColor;
}

#applicant {
  color: $BaseColor;
  .vux-check-icon{
    span{font-size:$otherFontSize }
  }
  .clause_confirm{
    margin-bottom:$OperatorHeight ;
    padding: 15px;
    font-size: $otherFontSize;
    line-height: 20px;
    .a_link{
        color:#68a6f5;
        font-size:$otherFontSize
      }
  }
  .plan-info{
    position: fixed;
    top: 0;
    z-index: 100;
    background: #fff;
    width: 100%;
    .plan-info-lable{color: #959595;font-size: 0.7rem}
    .plan-info-content{
      line-height: 1.5rem;
      span{color:$BaseColor;margin-right: 0.5rem;}
      font-size: 0.95rem;
    }
  }
/*  .weui-label{color:$BaseColor;}*/
  .weui-cells{
    font-size: $BaseFontSize;
  }
  .vux-cell-placeholder{color: #c6c6cc;}
  .oprations {
    position: fixed;
    height: $OperatorHeight;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    div {
      font: normal $buttonFontSize normal;
      color:#fff;
      height: $OperatorHeight;
      line-height: $OperatorHeight;
      text-align: center;
    }
    .plan-price {
      background-color: #FFF;
      color: $orangeColor;
      line-height: $OperatorHeight;
    }
    .plan-share {
      background-color: #ffb938;
      letter-spacing: 0.01rem;
    }
    .plan-buy {
      background-color: $orangeColor;
      letter-spacing: 0.01rem;
    }
    .plan-desc {
      /*background-color: #fff;*/
      color: $BaseColor;
      letter-spacing: 0.01rem;
    }
  }
  .weui-btn_primary{background-color: $orangeColor}
  .weui-icon-circle{ font-size: $otherFontSize;margin-top: -3px;}
  .weui-icon-success{font-size: $otherFontSize;margin-top: -3px;}
  .weui-input{ font-size: $BaseFontSize;}
  .vux-cell-value {
    color: $BaseColor;
    font-size: $BaseFontSize;
  }
  .insuredInfo {
    /*.weui-cells:before{display: none}*/
    .vux-no-group-title:before{    content: " ";
      position: absolute;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;}
  }
  .weui-cells:after{left: 15px;}

  .weui-cells{
    .weui-icon-warn{font-size: 16px;}
    .vux-input-icon.vux-input-icon{
      &:before{
        font-size:16px;
      }
    }
  }
  .weui-label{min-width: 105px;line-height: $BaseLineHeight}
  .vux-label{line-height: 1.9rem;}
}
.vux-x-dialog{.weui-dialog__btn{color:$orangeColor}}
.t-source {
  font-size: 0.75rem;
  line-height: 1.2rem;
  color: $halfBlackColor;
}

.weui-toast_text{
  .weui-toast__content{font-size:$otherFontSize }
}
.v-transfer-dom{
  .vux-popup-header-right{
    color:$orangeColor;
    /*color:#68a6f5;*/
  }
}
.vux-no-group-title::after{display: none}
/*.vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before{font-size:16px; }*/

</style>
