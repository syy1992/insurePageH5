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
          <span>保费：{{planPrice}}元</span>
        </div>
      </div>
    </div>

    <group  :gutter=70>
      <cell :title='"投保人信息"' >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <x-input title="企业名称" required placeholder="请输入企业名称" text-align='left' v-model.trim="applicantName" ></x-input>
      <x-input title="营业执照" required placeholder="请输入营业执照" text-align='left' v-model.trim="applicantLicence" ></x-input>
      <x-address title="单位地址" required v-model="applicantAddress" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" :is-type="isAddress"></x-address>
      <x-input title="详细地址" required placeholder="请输入详细地址" text-align='left' v-model.trim="applicantAddressDetail" ></x-input>
      <x-input title="邮编"  required placeholder="请输入邮编" text-align='left' v-model.trim="applicantPropertyZip" :is-type="codeValue"></x-input>
      <x-input title="联系人" required placeholder="请输入联系人" text-align='left' v-model.trim="applicantContactName"></x-input>
      <x-input title="联系电话" keyboard="number" required placeholder="请输入联系电话" text-align='left'  v-model.trim="applicantContactPhone" is-type="china-mobile"></x-input>
    </group>
    <group :gutter=10 class='remove-line' >
      <cell :title='"被保人信息"'  >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <popup-picker title="与投保人关系"  :data="list" v-model="assured" value-text-align="left" @on-change='changeRelationPicker' class=''></popup-picker>
      <!--<x-input title="邮编"  required placeholder="请输入邮编" text-align='left' v-model="propertyZip" :is-type="codeValue" class="propertyZipClass"></x-input>-->
    </group>

    <group :gutter=0 class='insuredInfo' v-show='isShow'>
      <x-input title="企业名称" required placeholder="请输入企业名称" text-align='left' v-model.trim="insuredName"></x-input>
      <x-input title="营业执照" required placeholder="请输入营业执照" text-align='left'  v-model.trim="insuredLicence"  ></x-input>
      <x-address title="单位地址" required v-model="insuredAddress" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" :is-type="isAddress"></x-address>
      <x-input title="详细地址" required placeholder="请输入详细地址" text-align='left' v-model.trim="insuredAddressDetail" ></x-input>
      <x-input title="邮编"  required placeholder="请输入邮编" text-align='left' v-model.trim="insuredPropertyZip" :is-type="codeValue"></x-input>
      <x-input title="联系人" required placeholder="请输入联系人" text-align='left' v-model.trim="insuredContactName"></x-input>
      <x-input title="联系电话" keyboard="number" required placeholder="请输入联系电话" text-align='left'  v-model.trim="insuredContactPhone" is-type="china-mobile"></x-input>
      <!--<x-input title="邮箱" required placeholder="请输入邮箱" text-align='left'  v-model="insuredMail" is-type="email" class="insuredMailClass"></x-input>-->
    </group>

    <group  :gutter=10>
      <!--<cell :title='"被保人信息"'  class='subTitle'>-->
        <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">-->
      <!--</cell>-->
      <x-address title="营业所处地址" required v-model="salesAddress" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" :is-type="isAddress"></x-address>
      <x-input title="详细地址" required placeholder="请输入详细地址" text-align='left' v-model="salesAddressDetail" ></x-input>
      <x-input title="邮编"  required placeholder="请输入邮编" text-align='left' v-model="PropertyZip" :is-type="codeValue"></x-input>
    </group>
    <group  :gutter=10>
      <x-input title="推荐码"  placeholder="请输入推荐码（电话号码）" text-align='left'  v-model.trim="recommendCode" is-type="china-mobile" class="recommendCodeClass"></x-input>
    </group>
    <!--<group :gutter=10>-->
      <!--<datetime v-model="startDate" format="YYYY-MM-DD"  title="生效日期"  :start-date='startDateNextDay'></datetime>-->
    <!--</group>-->
    <group  :gutter=10>
      <cell title='上传图片'  >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <div class="file">
        <div class='file_info'>
          <div>
            <!--<input class='fileImg' id='file1' type="file" name='file' accept="image/*" @change='add_img'>-->
            <input class='fileImg' id='file1' type="file" name='file' accept="image/*" @change='upload'>
            <img class='photo' id='photo1' src='https://jinheui.oss-cn-qingdao.aliyuncs.com/jiacaixian/photo_icon.png'>
            <p>营业执照</p>
          </div>
        </div>
        <div class='file_info'>
          <div>
            <input class='fileImg' id='file2' type="file" name='file' @change='upload2'>
            <img class='photo' id='photo2' src='https://jinheui.oss-cn-qingdao.aliyuncs.com/jiacaixian/photo_icon.png'>
            <p>投保单</p>
          </div>
        </div>
     </div>
    </group>
    <div class="clause_confirm" >
           <check-icon :value.sync="ischeck"> </check-icon>
            <span style='line-height: 1.5rem;font-size: 0.82rem;'>我已认真阅读<a class='a_link' @click='showDesc=true'>《投保声明》</a>并同意上述协议约定</span>
          <!--<p class='t-source'>投保须知：每个家庭地址限购一份，多买无效。</p>-->
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc" position="bottom" max-height="50%">
        <div class='close' @click="showDesc = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
            <p  class='pstyle'>投保声明</p>
            <p style='text-indent:2em;'>
              1.本人在填写本投保单之前，已经阅读并理解了本投保单及后附的《财产一切险条款（2014版）》、《公众责任保险条款（2015版）》、《雇主责任保险条款（B款）（2017版）》的内容，尤其是关于免除保险人责任的条款及投保人和被保险人义务条款，对该保险条款及保险条件已完全了解，并同意接受保险条款的约束。
             </p>
            <p style='text-indent:2em;'> 2.本投保单所填各项内容均属事实，同意以本投保单作为保险人签发保险单的依据。</p>
            <p style='text-indent:2em;'>3.本人知悉并同意授权北京佳盛保险代理有限公司协助办理投保事宜，同意北京华油联合燃气开发有限公司协助提交材料。</p>
          </div>
        </group>
      </popup>
    </div>
    <flexbox :gutter="0" class="oprations">
      <flexbox-item :order="1"  :span="1/6">
        <div class="plan-desc"  style='text-align: right'>保费：</div>
      </flexbox-item>
      <flexbox-item :span="1/3" :order="1" >
        <div class="plan-price" style='text-align: left'>￥ {{planPrice}}.00</div>
      </flexbox-item>
      <flexbox-item :order="2">
        <!--<div class="plan-buy"   @click="validateInputVal">立即投保</div>-->
        <div :class="{'plan-buy':show1,'dis':dis}">
          <button @click="validateInputVal" class="amounts" :disabled="dis">立即投保</button>
        </div>
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
    Popup,
//    Checklist,
    Value2nameFilter as value2name,
        Datetime,
        Selector
    } from 'vux'
import ChinaAddressData from '../../../static/js/china_address.js'
  export default {
  name: 'applicant',
  directives: {
    TransferDom
  },
  data(){
      let queryObj = querystring.parse(location.hash.split("?")[1]);
      console.log(location.hash.split("?")[1])
      console.log(typeof queryObj)
      console.log(JSON.stringify(queryObj))
    return {
        show1: true,
        dis: false,
        uploadimg:null,
        uploadimg2:null,
        uploadimgform:null,
        uploadimgform2:null,
        imgStr:'',
        picNames:'',
        showDesc:false,
        isFetching:false,
        ischeck:true,
        isShow:false,
        assured: ['本人'],
        relationNumber:0,
        list: [[]],
        copyUserData:null,
        relationData: [
                {'label':'0','value':'本人'},
                {'label':'9','value':'其他'},
        ],
//        platNo:querystring.parse(location.href.substr(1)).platNo,//平台编号
        planNo:decodeURIComponent(queryObj.planNo||''),//方案编号,
        planPrice:decodeURIComponent(queryObj.planPrice||''),//方案价格,
        planInfo:decodeURIComponent(queryObj.planInfo||''),//方案信息,
        applicantName:'',
        applicantLicence:'',
        applicantAddress:[],
        applicantAddressDetail:'',
        applicantPropertyZip:'',
        applicantContactName:'',
        applicantContactPhone:'',

        insuredName:"",
        insuredLicence:"",
        insuredAddress:[],
        insuredAddressDetail:"",
        insuredPropertyZip:"",
        insuredContactName:"",
        insuredContactPhone:"",

        salesAddress:[],
        salesAddressDetail:'',
        addressData: ChinaAddressData.china_address,
        address: [],//地址
        addressDetail:'',
        PropertyZip:'',

        startDate:'',//开始日期
        startDateNextDay:'',
        recommendCode:'',
      }
  },
  components:{
    Group,Cell,Loading,Flexbox, FlexboxItem,Radio,XInput,XButton, XAddress,PopupPicker,CheckIcon, Popup,Datetime,Selector
  },
  methods:{
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

    /*提交 方案*/
    jiacaiApply(){
      /*配置信息相关*/
        var that = this;
        var reqTid = new Date().getTime();
        var account =process.env.jiacaiAccountB;
        var privateKey = process.env.jiacaiBPrivateKey;

      /*配置信息相关*/
        var userData= {
            "account": account,
            "reqTid": reqTid,
            "sign": sign,
            "data":JSON.stringify(
                 {
                     applicant: {
                         type: '1',
                         legalPerson: {
                             name: this.applicantName,
                             creditNo: this.applicantLicence,//营业执照
                             address: value2name(this.applicantAddress, this.addressData) + ' ' + this.applicantAddressDetail,
                             zipCode: this.applicantPropertyZip,
                             contactMan: this.applicantContactName,
                             contactPhone: this.applicantContactPhone,
                         },
                     },
                     insuredList: [{
                        /* insured: {*/
                             type: '1',
                             legalPerson: {
                                 name: this.insuredName,
                                 creditNo: this.insuredLicence,
                                 address: value2name(this.insuredAddress, this.addressData) + ' ' + this.insuredAddressDetail,
                                 zipCode: this.insuredPropertyZip,
                                 contactMan: this.insuredContactName,
                                 contactPhone: this.insuredContactPhone,
                             },
                        /* }*/
                     }],
                     beneficiaryList: [{type: '1'}],//受益人
                     extendInfo: {
                             insPeriod: '365',
                             propertyAddress: value2name(this.salesAddress, this.addressData) + ' ' + this.salesAddressDetail,//营业处所
                             premium: this.planPrice,
                             PropertyZip: this.PropertyZip,
//                                     startDate:this.startDate,
                             picNames: this.picNames
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
        //深拷贝 提交data内容
        this.copyUserData=JSON.parse(JSON.stringify(userData));
        this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/kunlunGasRisk/merchantApply',this.copyUserData).then(({data}) => {
            switch(data.resCode){
                case '0000'://成功
                    this.isFetching = false;
                    console.log(data);
                    this.showToast('success')
                    this.dis = true;
                    break;
                case '1001'://账号不存在或被禁用
//                    this.showToast('账号不存在或被禁用')
                    this.showToast( data.resMsg )
                    break;
                case '1002'://
                    this.isFetching = false;
//                    this.showToast('参数为空或格式错误')
                    this.showToast( data.resMsg )
                    break;
                case '1003'://必填写项为空
                    this.isFetching = false;
//                    this.showToast('必填写项为空')
                    this.showToast( data.resMsg )
                    break;
                case '1004'://验签失败
                    this.isFetching = false;
//                    this.showToast('验签失败')
                    this.showToast( data.resMsg )
                    break;
                case '9999'://系统异常
                    this.isFetching = false;
//                    this.showToast('系统异常')
                    this.showToast( data.resMsg )
                    break;
                default:
            }
        });
    },
      //校验
      validateInputVal(){
          var that=this;
          if(this.relationNumber==0){
              if(!this.applicantName){
                  this.showToast('投保人企业名称不能为空');
                  return false;
              }else if(!this.applicantLicence) {
                  this.showToast('投保人营业执照不能为空')
                  return false;
              }else if(this.applicantAddress.length==0){
                  this.showToast('投保人单位地址不能为空');
                  return false;
              }else if(!this.applicantAddressDetail){
                  this.showToast('投保人详细地址不能为空');
                  return false;
              }else if(!this.applicantPropertyZip){
                  this.showToast('投保人邮编不能为空');
                  return false;
              }else if(!this.applicantContactName){
              this.showToast('投保人联系人不能为空');
              return false;
             }else if(!this.applicantContactPhone){
                  this.showToast('投保人联系电话不能为空');
                  return false;
              }else if(this.salesAddress.length==0){
                  this.showToast('营业处所不能为空')
                  return false;
              }
              else if(!this.salesAddressDetail){
                  this.showToast('营业处所详细地址不能为空');
                  return false;
              }else if(!this.PropertyZip){
                  this.showToast('营业处所邮编不能为空')
                  return false;
              }else if(!this.uploadimg){
                  this.showToast('营业执照图片不能为空')
                  return false;
              }else if(!this.uploadimg2){
                  this.showToast('投保单图片不能为空');
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
                  this.showToast('投保人企业名称不能为空')
                  return false;
              }else if(!this.applicantLicence){
                  this.showToast('投保人营业执照不能为空')
                  return false;
              }else if(!this.applicantContactName){
                  this.showToast('投保人联系人不能为空')
                  return false;
              }else if(!this.applicantContactPhone){
                  this.showToast('投保人联系电话不能为空')
                  return false;
              }else if(this.applicantAddress.length==0){
                  this.showToast('投保人单位住址不能为空')
                  return false;
              }else if(!this.applicantAddressDetail){
                  this.showToast('投保人详细地址不能为空')
                  return false;
              }else if(!this.applicantPropertyZip){
                  this.showToast('投保人邮编不能为空')
                  return false;
              }else if(!this.insuredName){
                  this.showToast('被保人企业名称不能为空')
                  return false;
              }else if(!this.insuredLicence){
                  this.showToast('被保人营业执照不能为空')
                  return false;
              }else if(this.insuredAddress.length==0){
                  this.showToast('被保人单位住址不能为空')
                  return false;
              }else if(!this.insuredAddressDetail){
                  this.showToast('被保人详细地址不能为空')
                  return false;
              }else if(!this.insuredPropertyZip){
                  this.showToast('被保人邮编不能为空')
                  return false;
              }else if(!this.insuredContactName){
                  this.showToast('被保人联系人不能为空')
                  return false;
              }else if(!this.insuredContactPhone){
                  this.showToast('被保人联系电话不能为空')
                  return false;
              }else if(this.salesAddress.length==0){
                  this.showToast('营业处所不能为空')
                  return false;
              }else if(!this.salesAddressDetail){
                  this.showToast('营业处所详细地址不能为空')
                  return false;
              }else if(!this.PropertyZip){
                  this.showToast('营业处所邮编不能为空')
                  return false;
              }else if(!this.uploadimg){
                  this.showToast('营业执照图片不能为空')
                  return false;
              }else if(!this.uploadimg2){
                  this.showToast('投保单图片不能为空')
                  return false;
              }else if(!this.ischeck) {
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
      //发出投保请求
      ajaxApplyQuery(){
          this.isFetching = true;//show loading
            this.uploadQuery()
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
      showToast(text){
      this.$vux.toast.show({
          text: text,
          type:'text',
          width:'10em'
      });
  },
      getNextDate() {
          let date = new Date();
          let sign1 = "-";
          let sign2 = ":";
          let year = date.getFullYear();// 年
          let month = date.getMonth() + 1; // 月
          let day  = date.getDate(); // 日
          let nextDate=day+1;
//          console.log('d'+nextDate)
          let hour = date.getHours(); // 时
          let minutes = date.getMinutes(); // 分
          let seconds = date.getSeconds(); //秒
          let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
          let week = weekArr[date.getDay()];
          // 给一位数数据前面加 “0”
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (day >= 0 && day <= 9) {
              day = "0" + day;
          }
          if (nextDate >= 0 && nextDate <= 9) {
              nextDate = "0" + nextDate;
          }
          if (hour >= 0 && hour <= 9) {
              hour = "0" + hour;
          }
          if (minutes >= 0 && minutes <= 9) {
              minutes = "0" + minutes;
          }
          if (seconds >= 0 && seconds <= 9) {
              seconds = "0" + seconds;
          }

//          var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
          let currentdate = year + sign1 + month + sign1 + nextDate ;
          console.log('currentdate='+currentdate)
          this.startDateNextDay=currentdate;
          return currentdate;
      },
      upload(e){
          this.uploadimg=event.target.files[0];
          let size =  this.uploadimg.size;//文件的大小，判断图片的大小
          if (size > 10485760) {
              alert('请选择10M以内的图片！');
              return false;
          }
          let reader = new FileReader();
          reader.onload = function (e) {
              let img=document.getElementById('photo1');
              img.setAttribute('src', e.target.result)
          };
          reader.readAsDataURL(e.target.files[0]);
      },
      upload2(e){
          this.uploadimg2=event.target.files[0];
          let size =  this.uploadimg2.size;//文件的大小，判断图片的大小
          if (size > 10485760) {
              alert('请选择10M以内的图片！');
              return false;
          }
              let reader = new FileReader();
              reader.onload = function (e) {
                  let img=document.getElementById('photo2');
                  img.setAttribute('src', e.target.result)
              };
              reader.readAsDataURL(e.target.files[0]);
      },
      uploadQuery(){
          this.uploadimgform = new FormData();
          this.uploadimgform.append('files', this.uploadimg, this.uploadimg.name);
          this.$http.post(process.env.picBaseUrl+'/kunLunGasRisk/upload',this.uploadimgform,{
              headers:{'Content-Type':'multipart/form-data'}
          }).then(response => {
              if(response.data.resCode='0000'){
              this.imgStr=response.data.data[0];
                  console.log(response.data)
                  this.uploadQuery2()
              }

          }).catch(error => {
              console.log('上传图片出错！')
          })
      },
      uploadQuery2(){
          this.uploadimgform2 = new FormData();
          this.uploadimgform2.append('files', this.uploadimg2, this.uploadimg2.name);

          this.$http.post(process.env.picBaseUrl+'/kunLunGasRisk/upload',this.uploadimgform2,{
              headers:{'Content-Type':'multipart/form-data'}
          }).then(response => {
              if(response.data.resCode='0000'){
                  this.picNames=this.imgStr+'|'+response.data.data[0];
                  console.log(this.picNames)
                  if(this.picNames!=''){
                      this.jiacaiApply()
                  }else{
                      alert('图片上传失败')
                      return ;
                  }
              }

          }).catch(error => {
              console.log('上传图片出错！')
          })
      }
      },

  mounted(){
      this.initRelation();
//      this.getNextDate();
//      this.$nextTick(function () {
//          this.startDate=this.startDateNextDay;
//      });
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
$inputColor: #666666;
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
  .vux-cell-placeholder{color: #c6c6cc;}
  .oprations {
    position: fixed;
    height: $OperatorHeight;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    z-index: 10;
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
  .weui-input{ font-size: $BaseFontSize;  color: $inputColor;}
  .vux-cell-value {
    color: $inputColor;
    font-size: $BaseFontSize;
  }

  .insuredInfo {
    .weui-cells{
      &:first-child{
        &:before{display: none}
      }
    }

    position: relative;
    &:after{
      content: " ";
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
      left: 15px;
    }
  }
  .weui-cells{
    font-size: $BaseFontSize;
    &:after{display: none}
    &:before{display: none}
    .weui-icon-warn{font-size: 16px;}
    .vux-input-icon.vux-input-icon{
      &:before{
        font-size:16px;
      }
    }
  }
  /*.remove-line{position: relative;*/
    /*&:after{content: " ";*/
      /*position: absolute;*/
      /*left: 0;*/
      /*top: 0;*/
      /*right: 0;*/
      /*height: 1px;*/
      /*border-top: 1px solid #D9D9D9;*/
      /*color: #D9D9D9;*/
      /*-webkit-transform-origin: 0 0;*/
      /*transform-origin: 0 0;*/
      /*-webkit-transform: scaleY(0.5);*/
      /*transform: scaleY(0.5);*/
      /*}*/
  /*}*/
  .weui-label{min-width: 105px;line-height: $BaseLineHeight}
  .vux-label{line-height: 1.9rem;}
  .vux-datetime{
    div{
      p{width: 105px;line-height: 1.9rem;}
    }
  }
  .weui-cell_access{
    .weui-cell__ft{text-align: left;}
  }
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
.dp-container {
  .dp-header {
    .dp-item.dp-right {
      color: $orangeColor
    }
  }
}
.divstyle{
  font-size: 0.7rem; text-align: left;padding:15px;color: $inputColor;
  p{line-height:1.3rem;}
  .pstyle{margin-bottom: 0.3rem;font-size: $BaseFontSize;color: #353535;}

  .weui-cell{
    .vux-cell-bd{
      p{
        .vux-label{font-size:0.8rem;text-align: justify}
      }
    }
  }
}
  .vux-popup-dialog{
    .weui-cells{margin-top: 0}
    .close{text-align: right;}
  }

.file{
  display: flex;
  /*align-items:center;*/
  /*justify-content:center;*/
  /*flex-direction:row;*/
  /*flex-wrap:wrap;*/
  padding-bottom: 10px;
  .file_info{
    width: 50%;
    display:flex;
    height:150px;
    align-items: center;
    justify-content: space-around;
    div{
      width: 120px;
      /*margin: auto;*/
      /*flex:1;*/
      /*position: relative;*/
      img{
        /*position: absolute;*/
        width: 120px;height: 120px;}
      input{opacity: 0;position: absolute;width: 120px;height: 120px;z-index: 1}
      p{text-align: center;font-size: 0.9rem;line-height: 1.9rem;}
    }
  }
}
/*.file li{float: left;position: relative;width: 21%;margin-left: 9%;}
.file li p{width:100%;position:absolute;left:0;right: 0;margin:auto;bottom:-18px;}
.file .photo{width: 100%;}
.fileImg{opacity: 0;width: 100%;height: 100%;position:absolute;opacity:0}*/
.amounts{
  border:none;
  background: none;
  color: #fff;
  font-size: 15px;
}
.dis{
  background: #ccc !important;
}
</style>
