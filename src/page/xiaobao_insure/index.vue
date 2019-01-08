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

    <group :gutter=70>
      <datetime v-model="startDate" format="YYYY-MM-DD"  title="生效日期"  :start-date='startDateNextDay' :end-date="endDate"></datetime>
    </group>
    <group :title='""' :gutter=10>
      <cell :title='"投保信息"' >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <x-input title="企业名称" required placeholder="请按营业执照输入企业名称" v-model="taxPayer" text-align='left' ref='taxPayer' class='taxPayer' @change='nameChange'></x-input>
      <x-address title="经营地址" required v-model="address" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" :raw-value='rawValue'  class='address'></x-address>
      <x-input title="详细经营地址" required placeholder="详细经营地址请具体到门牌号" text-align='left'  v-model="addressDetail" ref='addressDetail' class='addressDetail'></x-input>
      <x-input title="统一社会信用代码" required placeholder="请输入统一社会信用代码" text-align='left'  v-model="creditNo" ref='creditNo' class='creditNo' :is-type='this.tool.validateTaxNumber' id='creditNo'></x-input>
      <x-input title="联系人" required placeholder="请输入联系人" text-align='left' v-model="contactName" ref='contactName' class='contactName'></x-input>
      <x-input title="联系电话"  required placeholder="请输入联系人手机号码" text-align='left'  v-model="contactPhone"  is-type="china-mobile" ref='contactPhone' class='contactPhone'></x-input>
      <x-input title="邮箱地址" required placeholder="请输入邮箱地址" v-model="email" text-align='left' is-type='email' ref='email' class='email'></x-input>
    </group>
    <group :title='""' :gutter=10 >
      <cell :title='"请选择发票类型"' >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <radio :options="receiptTypes" v-model='receiptType'  class='subTitle'></radio>
    </group>

    <group :title='""' :gutter=10  v-show='receiptType==1'>
      <div style='padding: 10px 15px;'>
        如需专用发票，请拨打客服热线：<a href='tel:021-95518' class='tel' >021-95518</a>
      </div>
    </group>
    <group :title='""' :gutter=10  v-show='receiptType==2' class='showInvoice'>
      <cell :title='"核对开票信息"'  >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <cell title="企业名称" primary="content"  class='company' >{{taxPayer==null||taxPayer==""?"企业名称":taxPayer}}</cell>
      <cell title="纳税人识别号" primary="content"  class='company' >{{creditNo==null||creditNo==""?"统一社会信用代码":creditNo}}</cell>
    </group>

    <div class="plan-picker-wrap clause_confirm">
      <check-icon :value.sync="ischeck"> </check-icon>
      <span style='line-height: 1.5rem;font-size: 0.82rem'>本人承诺投保信息的真实性，理解并同意<a class='link' @click='showDesc=true'>《投保须知》</a><span style='color: #232323'>与</span><a class='link' @click='showDesc1=true'>《保险条款》</a>的全部内容</span>
      <p class='t-source'>温馨提示：投被保人信息绝对保密,仅供保单投保使用,该保单应由投保人支付</p>
    </div>

    <div v-transfer-dom>
      <popup v-model="showDesc" position="bottom" max-height="50%">
        <div class='close' @click="showDesc = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
            <p  class='pstyle'>投保须知</p>
            <p style='text-indent:2em;'>请详细阅读本保险适用的《公众责任保险条款》，并特别就条款中有关责任免除和投保人、被保险人义务的内容进行阅读。购买本产品即表示投保人接受本产品条款的全部内容，并准确填写以下信息：投保人/被保险人名称、营业处所（具体到门牌号）。</p>
            <p style='text-indent:2em;'>本人(本公司)特此声明，以上陈述就我们所了解并相信是真实和全面的。同时，我们同意，本投保信息是承保上述风险的保险单的基础和组成部分，双方同意，保险人仅按保险单条款规定予以赔偿，被保险人不应提出任何其他性质的索赔。</p>
            <p>【基本信息】</p>
            <p> 本产品为中国人民财产保险股份有限公司公众责任保险1999版（人保（备案）[2009]N304号），由中国人民财产保险股份有限公司承保，本公司在全国所有省份及直辖市设有分公司，可在全国大陆（除港、澳、台）销售。</p>
            <p>【产品介绍】</p>
            <p>1.本产品保险期限：1年</p>
            <p>2.本产品被保险人仅限为教育类培训机构，每一个被保险地址限投保一份，多投无效。</p>
            <p>3.投保人须在投保前仔细阅读投保须知并确认已读并同意投保规则。</p>
            <p>4.本产品保险责任：</p>
            <p>在本保险有效期限内，被保险人在本保险单明细表中列明的营业处所内依法从事生产、经营等活动，由于意外事故造成下列损失或费用，依法应由被保险人承担的民事赔偿责任，保险人负责赔偿：（一）第三者人身伤亡或财产损失；（二）事先经保险人书面同意的诉讼费用；（三）发生保险责任事故后，被保险人为缩小或减少对第三者人身伤亡或财产损失的赔偿责任所支付的必要的、合理的费用。</p>
            <p>保险人对上述第（一）与第（二）项的每次事故赔偿总金额不超过本保险单明细表中列明的每次事故赔偿限额；如本保险合同约定了每人人身伤亡赔偿限额的，保险人对每次事故每人人身伤亡的赔偿金额不超过每人人身伤亡赔偿限额。保险人对上述第（三）项的每次事故赔偿金额不超过本保险单明细表中列明的每次事故赔偿限额。在保险期限内，保险人对被保险人的累计赔偿总金额不得超过本保险单明细表中列明的累计赔偿限额。</p>
            <p>如被保险人选择投保公众责任保险附加食品、饮料责任保险（人保（备案）[2009]N289号），则本保险扩展承保本保险单中列明的被保险人营业处所范围内，因被保险人提供的食品、饮料或掺有异物的食品、饮料造成第三者人身伤亡或财产损失时被保险人应负的赔偿责任。</p>
            <p>5.本产品责任免除：</p>
            <p>（1）被保险人因在本保险单列明的地点范围内所拥有、使用或经营的游泳池发生意外事故造成的第三者人身伤亡或财产损失；</p>
            <p>（2）根据相关法律法规，可认定为属于被保险人雇员职业责任的除外。</p>
            <p>本保险的其他除外责任详见保险条款。</p>
            <p> 本保险单列明的或有关条款中规定的应由被保险人自行负担的免赔额，保险人不负责赔偿。其他不属于本保险责任范围内的一切损失、费用和责任，保险人不负责赔偿。</p>
            <p>6.根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。投保人投保本保险时视为接受以中国人民财产保险股份有限公司提供的电子保单作为本投保书成立的合法有效凭证。</p>
            <p>【服务流程】</p>
            <p>1.本合同提供电子保险单，您可于人保财险官网（www.epicc.com.cn）下载电子保单。如需纸质保单或发票，请拨打客服热线：021-95518；</p>
            <p>2.投保、承保、退保、理赔的办理流程：</p>
            <p>（1）投保：投保人（企业）根据营业处所面积勾选需要的保障方案，并填写投保信息。</p>
            <p>（2）承保：人保财险实时接收客户投保信息，并由系统实时完成核保，核保通过且保费到账后，即生成保单。</p>
            <p>（3）退保/批改：如需批改或退保，请拨打021-95518。保险公司审核是否符合退/批改条件，若符合条件且资料齐全，退保保费退还至投保人名下指定银行卡。本保险一经起保，退保时需扣除按日费率收取的已了责任部分短期保费。</p>
            <p>（4）理赔：出险后尽快拨打021-95518进行报案，根据指示提交理赔材料，保险公司将审核案件并将属于保险公司保险责任的理赔款直接转账至被保险人/受益人名下的指定银行卡账户。出险理赔时，若被保险人无法提供需要的相关营业执照、经营许可证等证件，或实际营业场所面积大于被保险人所填报的营业场所面积，保险公司有权进行比例赔付。</p>
            <p>（5）注销：报案后，应尽快提供理赔材料，并保持通讯畅通。若超过60天未提供理赔材料或号码无法联系，将视为放弃索赔。</p>
            <p>（6）申请纸质发票：如需纸质发票，请拨打021-95518申请。</p>
            <p>【重要告知】</p>
            <p style='text-indent:2em;'>投保人需遵守如实告知义务，如违反如实告知义务，则按《保险法》相关规定处理。</p>
          </div>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc1" position="bottom" height="50%" style='background: #ffffff'>
        <div class='close' @click="showDesc1 = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div title='产品条款' class='divstyle'>
            <p class='pstyle' >保险条款</p>
            <cell :title="clause[0]" link="http://www.supplyfintech.com/insurance_clause/gongzexian_risks_01.pdf" class='linkClause' style='margin-top: 5px;'></cell>
            <cell :title="clause[1]" link="http://www.supplyfintech.com/insurance_clause/gongzexian_risks_02.pdf" class='linkClause'></cell>
          </div>
        </group>
      </popup>
    </div>
    <flexbox :gutter="0" class="oprations">
      <flexbox-item>
        <div class="plan-buy"  @click='exhibitionapply' v-show='isFooterShow'>立即投保</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
    import ChinaAddressData from '../../../static/js/china_address.js'
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
//        ChinaAddressData,
        XAddress,
        PopupPicker,
        CheckIcon,
        Popup,
        Datetime,
        Value2nameFilter as value2name,
    } from 'vux'

    export default {
        name: 'applicant',
        directives: {
            TransferDom
        },
        data(){
            return {
                rawValue:false,
                isFetching:false,
                ischeck:false,
                isShow:false,
                showDesc:false,
                showDesc1:false,
                isFooterShow:true,
                screenHeight: document.body.clientHeight,
                clause: ['人保（备案）[2009]N304号-公众责任保险条款（1999版）', '中国人民财产保险股份有限公司公众责任保险附加食品、饮料责任条款'],
              /*       assured: ['本人'],
               list: [['本人','父母', '子女', '妻子']],*/

                receiptTypes:[{key:1,value:'专票'},{key:2,value:'普票'}],
                receiptType:2,
                taxPayer:'',//公司名称
                taxPayerProvince:'',//N纳税人省级地址
                taxPayerAddress:'',//纳税人地址
                taxPayerPhone:'',//n纳税人电话
                taxPayerBankName:'',//开户行
                taxPayerBankNo:'',//开户行账号
                email:'',//收票地址

                creditNo:'',//统一信用代码
                contactName:"",//联系人姓名，
                contactPhone:"",//联系人电话
                addressData: ChinaAddressData.china_address,
                address: [],//机构地址
                addressDetail:'',//详细地址
                planNo:decodeURIComponent(querystring.parse(location.search.substr(1)).planNo||''),//方案编号,
                planPrice:decodeURIComponent(querystring.parse(location.search.substr(1)).planprice||''),//方案价格,
                planInfo:decodeURIComponent(querystring.parse(location.search.substr(1)).planinfo||''),//方案信息,
                area500plus:decodeURIComponent(querystring.parse(location.search.substr(1)).area500plus||''),//方案信息,
                additionRisk:decodeURIComponent(querystring.parse(location.search.substr(1)).additionRisk||''),//方案信息,
                salesNo:decodeURIComponent(querystring.parse(location.search.substr(1)).salesNo||''),//业务员,

                startDate:'',//开始日期
                endDate:'',
                startDateNextDay:'',
                copyUserData:null,
                xinputFieldArr:["taxPayer","addressDetail","creditNo","contactName","contactPhone",/*"taxPayerCode",*/"email",],
                timeTag:9999999999000
            }
        },
        components:{
            Group,Cell,Loading,Flexbox, FlexboxItem,Radio,XInput,XButton,/*ChinaAddressData,*/ XAddress,PopupPicker,CheckIcon,  Popup, Datetime,md5
        },
        methods:{
            //增加icon
            nameChange(){},
            addicon(){
                let p= document.getElementsByClassName('vux-datetime')[0].children[0].children[0];
                let img = document.createElement("img");
                let imgUrl=require('../../../static/images/icon.png')
                img.setAttribute("src",imgUrl);
                img.setAttribute("class","p_img");
                p.appendChild(img);
            },
          /*提交 方案*/
            exhibitionapply(){
              /*配置信息相关*/
                var that = this;
                var reqTid = new Date().getTime();
                var account =process.env.xiaobaoAccount;
                var privateKey = process.env.xiaobaoPrivateKey;
              /*配置信息相关*/

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
                                        name:this.taxPayer,//机构名称,
                                        creditNo:this.creditNo,//统一信用代码
                                        contactMan:this.contactName,
                                        contactPhone:this.contactPhone,
                                        address:value2name(this.address,this.addressData)+ ' ' +this.addressDetail,//机构地址
                                    }
                                },
                                insuredList:[],//团单时候被保险人为多个
                                beneficiaryList:[],
                                extendInfo:{
                                        startDate:this.startDate,
                                        invoiceTitle:this.taxPayer,//发票抬头（公司名称）
                                        invoiceEmail:this.email,//发票接收邮箱
                                        invoiceTaxNo:this.creditNo,//税号this.creditNo
                                        invoiceType:this.receiptType,//发票类型
                                        area500plus:this.area500plus,
                                        additionRisk:this.additionRisk
                                },
                                commonInfo:{
                                    platNo:account,//平台编号，
                                    planNo:this.planNo,//产品方案编号
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
                this.copyUserData=JSON.parse(JSON.stringify(userData));
                if(this.receiptType == 1){
                    if(this.$refs.taxPayer.valid!= true){
                        this.showToast('企业名称不能为空')
                        return;
                    }else if(this.address.length== '0'){
                        this.showToast('请选择经营地址')
                        return;
                    }else if(this.$refs.addressDetail.valid!= true){
                        this.showToast('详细经营地址不能为空')
                        return;
                    }else if(this.creditNo==''){
                        this.showToast('统一社会信用代码不能为空')
                        return;
                    }else if(this.$refs.creditNo.valid!= true){
                        this.showToast('统一社会信用代码必须为数字或英文')
                        return;
                    }else if(this.$refs.contactName.valid!= true){
                        this.showToast('联系人不能为空')
                        return;
                    }else if(this.contactPhone==''){
                        this.showToast('联系电话不能为空')
                        return;
                    }else if(this.$refs.contactPhone.valid!= true){
                        this.showToast('联系电话有误')
                        return;
                    }else if(this.email==''){
                        this.showToast('邮箱不能为空')
                        return;
                    }else if(this.$refs.email.valid!= true){
                        this.showToast('邮箱有误')
                        return;
                    }else if (!this.ischeck) {
                        this.$vux.toast.show({
                            text: '请阅读投保须知',
                            type:'text',
                            onHide () {
                                // 使用定时器是为了让滑动时更加自然
                                that.scroll('clause_confirm');
                            }
                        });
                        return;
                    }else{
                        this.ajaxApplyQuery();
                    }


                }else if(this.receiptType == 2) {
                    if(this.$refs.taxPayer.valid!= true){
                        this.showToast('企业名称不能为空')
                        return;
                    }else if(this.address.length== '0'){
                        this.showToast('请选择经营地址')
                        return;
                    }else if(this.$refs.addressDetail.valid!= true){
                        this.showToast('详细经营地址不能为空')
                        return;
                    }else if(this.creditNo==''){
                        this.showToast('统一社会信用代码不能为空')
                        return;
                    }else if(this.$refs.creditNo.valid!= true){
                        this.showToast('统一社会信用代码必须为数字或英文')
                        return;
                    }else if(this.$refs.contactName.valid!= true){
                        this.showToast('联系人不能为空')
                        return;
                    }else if(this.contactPhone==''){
                        this.showToast('联系电话不能为空')
                        return;
                    }else if(this.$refs.contactPhone.valid!= true){
                        this.showToast('联系电话有误')
                        return;
                    }else if(this.email==''){
                        this.showToast('邮箱不能为空')
                        return;
                    }else if(this.$refs.email.valid!= true){
                        this.showToast('邮箱有误')
                        return;
                    }
//                    else if(this.taxPayerCode==''){
//                        this.showToast('纳税人识别号不能为空')
//                        return;
//                    }else if(this.$refs.taxPayerCode.valid!= true){
//                        this.showToast('纳税人识别号必须为数字和英文')
//                        return;
//                    }
                    else if (!this.ischeck) {
                        this.$vux.toast.show({
                            text: '请阅读投保须知',
                            type:'text',
                            onHide () {
                                // 使用定时器是为了让滑动时更加自然
                                that.scroll('clause_confirm');
                            }
                        });
                        return;
                    }else{
                        this.ajaxApplyQuery();
                    }
                }
            },
            changeInsure(){
                this.isShow=true;
            },
            onShadowChange:function(){},
            getCurrentDate() {
                let date = new Date();

                let sign1 = "-";
                let sign2 = ":";
                let year = date.getFullYear();// 年
                let month = date.getMonth() + 1; // 月
                let day  = date.getDate(); // 日
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
                let currentdate = year + sign1 + month + sign1+ day ;
                return currentdate;
            },
            getNextDateFn(){
                let date = new Date();
                let next=  this.tool.dateAddDay(date,1);//date 类型的
                this.startDateNextDay= this.tool.formatDate(next)
            },
            getEndDateFn(){
                let date = new Date();
                let end=  this.tool.dateAddDay(date,180);//date 类型的
                this.endDate= this.tool.formatDate(end)
            },
            //发出投保请求
            ajaxApplyQuery(){
                this.isFetching = true;//show loading
//              console.log(process.env.BASE_URL+':8765/insurance/publiab/apply?salesNo='+this.salesNo)
              console.log(process.env.BASE_URL+process.env.commonPort+'/insurance/publiab/apply?salesNo='+this.salesNo)
//                this.$http.post(process.env.BASE_URL+':8765/insurance/publiab/apply?salesNo='+this.salesNo,this.copyUserData).then(({data}) => {
                this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/publiab/apply?salesNo='+this.salesNo,this.copyUserData).then(({data}) => {
                    console.log(data);
//                    return false;
                    switch(data.resCode){
                        case '0000'://成功
                            this.isFetching = false;
                            if(JSON.parse(data.data).result=='1'){
//                                console.log('data1='+data);
                                let applyurl=JSON.parse(data.data).appReturnInfo.payUrl;
                                console.log('applyurl='+applyurl);
                                window.open(applyurl,'_self');
                            }
                            break;
                        case '1001'://账号不存在或被禁用
                            this.isFetching = false;
                            this.$vux.toast.show({
                                text: '账号不存在或被禁用',
                                type:'text',
                                width:'10em'
                            });
                            break;
                        case '1002'://
                            this.isFetching = false;
                            this.$vux.toast.show({
                                text: '参数为空或格式错误',
                                type:'text',
                                width:'10em'
                            });
                            break;
                        case '1003'://必填写项为空
                            this.isFetching = false;
                            this.$vux.toast.show({
                                text: '必填写项为空',
                                type:'text',
                                width:'10em'
                            });
                            break;
                        case '1004'://验签失败
                            this.isFetching = false;
                            this.$vux.toast.show({
                                text: '验签失败',
                                type:'text',
                                width:'10em'
                            });
                            break;
                        case '9999'://系统异常
                            this.isFetching = false;
                            this.$vux.toast.show({
                                text: '系统异常',
                                type:'text',
                                width:'10em'
                            });
                            break;
                        default:
                        //
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
            saveInfo(){
                let jsonData=
                    {
                        'taxPayer':this.taxPayer,
                        'address':this.address,
                        'addressDetail':this.addressDetail,
                        'creditNo':this.creditNo,
                        'contactName':this.contactName,
                        'contactPhone':this.contactPhone,
//                        'taxPayerCode':this.taxPayerCode,
                        'email':this.email,
                    };
                let  strJsonXiaobao=JSON.stringify(jsonData);
                sessionStorage.setItem('strJsonXiaobao',strJsonXiaobao);
            },
            getInfo(){
                var strJsonXiaobao=sessionStorage.getItem('strJsonXiaobao');

                if(!!strJsonXiaobao){
                    var jsonData=JSON.parse(strJsonXiaobao);
                    this.taxPayer=jsonData.taxPayer;
                    this.address=jsonData.address;
                    this.addressDetail=jsonData.addressDetail;
                    this.creditNo=jsonData.creditNo;
                    this.contactName=jsonData.contactName;
                    this.contactPhone=jsonData.contactPhone;
//                    this.taxPayerCode=jsonData.taxPayerCode;
                    this.email=jsonData.email;
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
                let tmp={}  //用于保存旧值 tmp={"taxPayer":"","addressDetail":""}
                for(let index in this.xinputFieldArr){
                    let field=this.xinputFieldArr[index]
                    //旧值保存到tmp.xx
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
//             解决iOS端浏览器后退后，x-input输入框数据与视图不同步的问题。由于iOS浏览器中，页面跳转后，再后退到本页面，view中x-input的输入内容被清空，但data中数据正常，此时data与view不同步，如果点击input则内容会立即显示出。
//             此处使用定时器检查这种不同步的情况，如果有则触发从data到view的同步
            fixIosInputBlank(){
                let that=this;
                setInterval(function () {
                    if(that.checkDateViewIdentical()){
                        return
                    }
                    //强制从数据同步到view
                    that.forceData2View();
                },500)
            },
            showToast(text){
                this.$vux.toast.show({
                    text: text,
                    type:'text',
                    width:'11em'
                });
            },
            initText(){
               document.getElementsByClassName('vux-radio-label')[0].innerHTML='专票<small style="color: #8c8c8c;font-size: 0.8rem;">（纸质增值税专用发票）</small>'
               document.getElementsByClassName('vux-radio-label')[1].innerHTML='普票<small style="color: #8c8c8c;font-size: 0.8rem;">（电子普通发票）</small>'
            }
        },
        created(){ },
        mounted(){
           this.initText()
            this.getCurrentDate(); //初始化当前次日
            this.getNextDateFn(); //次日
            this.getEndDateFn(); //结束日期

            this.$nextTick(function () {
                this.startDate=this.startDateNextDay;
                this.getInfo();
            });
            this.addicon();
//            this.listenHeight();
            const that = this;
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight;
                    //   that.screenHeight = window.screenHeight;
                    if(that.screenHeight>window.screenHeight){
                        console.log(that.screenHeight)
                        console.log(window.screenHeight)
                        that.isFooterShow=false;
                    }else{
                        that.isFooterShow=true
                    }
                })()
            }
//            let that=this;
            window.onbeforeunload = function (e) {
//                console.log("onbeforeunload");
                that.saveInfo()
//                console.log("onbeforeunload2");
            }
            //iOS浏览器中，页面跳转后，再后退到本页面，view中x-input的输入内容被清空，但data中数据正常，此时data与view不同步。使用此方法解决
            this.fixIosInputBlank();
        },
        watch: {
            screenHeight (val) {
                this.screenHeight = val
            },
        },

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
  $grayColor: #666;
  $BaseFontSize: 0.95rem;
  $otherFontSize: 0.8rem;
  $BaseLineHeight:1.9rem;
  .p_img{
    vertical-align: top;
    float: left;
    width: 20px;
    margin: 5px 5px 0 0;
  }
  .oprations {
    position: fixed;
    height: $OperatorHeight;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    div {
      font: normal $BaseFontSize normal;
      color: #fff;
      height: $OperatorHeight;
      line-height: $OperatorHeight;
      text-align: center;
    }
    .plan-buy {
      background-color: $orangeColor;
      letter-spacing: 0.01rem;
    }
  }
  #applicant .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
    color: $orangeColor;
  }
  #applicant .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color: $orangeColor;
  }
  .vux-x-dialog{.weui-dialog__btn_primary{color:$orangeColor}}
  .weui-cells_radio:first-child:after{

    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    /* right: 0; */
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  #applicant {
    color: $BaseColor;
    .weui-cell{line-height: 1.9rem}

    .vux-cell-placeholder{color: #c6c6cc;}
    .plan-info{
      /*padding: 10px 15px;*/
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
    .weui-btn_primary{background-color: $orangeColor}
    .weui-icon-success-no-circle{font-size: 13px;}
    .weui-icon-success-circle{font-size: 13px;}
    .weui-icon-circle{
      font-size: 13px;
      margin-top: -3px;}
    .weui-icon-success{
      &:before{
        font-size: 13px;
      };
      font-size: 13px;
      margin-top: -3px;
    }
    .vux-cell-value {
      /*     color: $BaseColor;*/
      color: $grayColor;
      font-size: $BaseFontSize;
    }
    .insuredInfo {
      .weui-cells:before{display: none}
    }
    .weui-cells{
      font-size: $BaseFontSize;
      .weui-icon-warn{font-size: 16px;}
      .vux-input-icon.vux-input-icon{
        &:before{
          font-size:16px;
        }
      }
      .vux-radio-label {
        font-size: $BaseFontSize;
        line-height: $BaseLineHeight;
      }
    }
    .weui-cell__bd{
      .weui-input{
        /*    line-height: $BaseFontSize;
            padding: 0.5rem 0;*/
        font-size: $BaseFontSize;
        color: $grayColor;
      }
    }
    .weui-label{min-width: 105px;line-height: $BaseLineHeight}
    #creditNo {
      .weui-label {
        min-width: 100px;
        line-height: 1;
        max-width: 100px;
        width: 100px;
        margin-right: 5px;
      }
    }
    .plan-picker-wrap{padding: 15px;font-size: $otherFontSize;text-align: justify;line-height: 20px;margin-bottom: 3rem}
    .company{
      .vux-cell-bd{
        .vux-label{width: 105px;line-height: $BaseLineHeight}
      }
      .weui-cell__ft{text-align: left;color:$halfBlackColor}
    }
  }
  .subTitle{
    position: relative;
    &:before{
      position: absolute;content: '';border-top:1px solid #D9D9D9;bottom:0;width: 100%;top:0;left: 15px;-webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
  a.link{color:#68a6f5;font-size:$otherFontSize}
  .v-transfer-dom{
    .vux-popup-header-right{
      /*color:#68a6f5;*/
      color:$orangeColor
    }
  }
  .vux-no-group-title::after{display: none}
  .t-source {
    font-size: 0.75rem;
    line-height: 1.2rem;
    color: $halfBlackColor;
  }
  /*#detail .vux-popup-dialog{background: #fff}*/
  /*#detail .vux-popup-header .vux-popup-header-right{color: #353535}*/
  .divstyle{
    font-size: 0.7rem; text-align: left;padding: 5px 15px;color: #666;margin-top: 0.5rem;
    p{line-height:1.3rem;}
    .pstyle{line-height: $BaseLineHeight;font-size: $BaseFontSize;color: #353535;}
    .weui-cell{
      .vux-cell-bd{
        p{
          .vux-label{font-size:0.8rem;}
        }
      }
    }
  }

  .linkClause{background: #eee;font-size:0.72rem;margin-bottom: 0.5rem;}
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
  .showInvoice{
    .weui-cells{
      position: relative;
      &:before{
        position: absolute;content: '';border-top:1px solid #D9D9D9;bottom:0;width: 100%;top:0;left: 0;-webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      a{
        &:before{display: none}
      }
    }
  }
  .tel{color: #10aeff}
  .dp-container{.dp-header {.dp-item.dp-right{  color:$orangeColor}}}
  .weui-toast_text{
    .weui-toast__content{font-size:$otherFontSize }
  }


</style>
