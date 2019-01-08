<template>
    <div id="applicant">
        <div v-transfer-dom>
            <loading :show="isFetching" :text="'加载中...'"></loading>
        </div>
        <div class="plan-info" ref='ul'>
            <div style='padding: 10px 15px'>
                <div class="plan-info-lable">已选择保障计划</div>
                <div class="plan-info-content">
                    <!--<span>保障方案：{{planInfo}}</span>-->
                    <span>保费：{{planPrice | formatMoney}}元</span>
                </div>
            </div>
        </div>

        <group  :gutter=70>
            <cell title='投保人信息' >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
            </cell>
            <x-input title="姓名" required placeholder="请输入投保人姓名" text-align='left' v-model.trim="applicantName" ref='applicantNameRef' ></x-input>
            <selector title="证件类型" :options="cardTypeList" v-model="applicantCardType" placeholder="请选择" readonly></selector>
            <x-input title="证件号码" required placeholder="请输入投保人证件号码" text-align='left' v-model.trim="applicantIdCard" :is-type='this.tool.validateIdCard' ref='applicantcid' @on-change='getInsurePersonIdCardNum' ></x-input>
            <selector  title="税收居民" :options="applicantTaxpayerList" v-model="applicantTaxResidents" placeholder="请选择" ></selector>

            <x-input title="电话号码" type="tel"required placeholder="请输入投保人手机号码" text-align='left'  v-model.trim="applicantPhone" is-type="china-mobile" ref='applicantPhoneRef' ></x-input>
            <x-input title="电子邮箱" required placeholder="邮箱用于接收电子保单" text-align='left'  v-model.trim="applicantMail" is-type="email" ref='applicantMailRef'></x-input>
            <x-address title="联系地址" required v-model="applicantAddress" raw-value :list="addressData" value-text-align="left" label-align="justify" placeholder="请选择" ></x-address>
            <x-input title="详细地址" required placeholder="请输入详细地址" text-align='left' v-model.trim="applicantAddressDetail"></x-input>
            <x-input  type="tel" title="邮政编码"  required placeholder="请输入邮政编码" text-align='left' v-model.trim="applicantPropertyZip" :is-type="this.tool.propertyZip" ref='applicantPropertyZipRef' ></x-input>
            <cell title='投保地区'  value-align='left'   v-model="addressDefault" class='default-width'></cell>
        </group>
        <group :gutter=10 >
            <cell title='被保人信息'  >
                <img slot="icon" width="20" style="display:block;margin-right:5px;"  :src="picSrc">
            </cell>
            <popup-picker title="与投保人关系"  :data="relationList" v-model="assured" value-text-align="left" @on-change='changeRelationPicker' ></popup-picker>
        </group>

        <group :gutter=0 class='insuredInfo' v-show='isShow'>
            <x-input title="姓名" required placeholder="请输入被保人姓名" text-align='left' v-model.trim="insuredName" ></x-input>
            <selector title="证件类型" :options="cardTypeList" v-model="insuredCardType" placeholder="请选择" readonly></selector>
            <x-input title="证件号码" required placeholder="请输入被保人证件号码" text-align='left' v-model.trim="insuredIdCard"  :is-type='this.tool.validateIdCard' ref='insuredcid' @on-change='getInsurePersonIdCardNum'></x-input>
            <x-input title="电话号码" type="tel" required placeholder="请输入被保人手机号码" text-align='left'  v-model.trim="insuredPhone" is-type="china-mobile" ref='insuredPhoneRef'></x-input>
        </group>

        <group  :gutter=0 class='remove-line' >
            <div class='vux-cell-box' style='padding: 10px 15px' id='profession'>
                <div class='vux-selector weui-cell weui-cell_select ' >
                    <div class="weui-cell__hd"><label class="weui-label">职业类别</label></div>
                    <div class="weui-cell__bd">
                        <input type='text' placeholder="请选择" class='weui-input' onfocus="this.blur()" @click='showProfession=true' v-model='profession' required>
                        <input type='hidden' v-model='professionCode' >
                    </div>
                </div>
            </div>
            <x-input  type="tel" title="身高(cm)" required placeholder="请输入身高(cm)" text-align='left' v-model.trim="stature" :is-type="this.tool.validateStature" ref='statureRef'></x-input>
            <x-input title="体重(kg)" required placeholder="请输入体重(kg)" text-align='left' v-model.trim="Weight" :is-type='this.tool.validateWeight' ref='WeightRef'></x-input>
        </group>
        <group  :gutter=10>
            <cell title='保障权益' >
                <img slot="icon" width="20" style="display:block;margin-right:5px;"  :src="picSrc">
            </cell>
            <selector title="保障额度" :options="amountList" placeholder="请选择" v-model="planIndex" @on-change='getInsurePersonIdCardNum'></selector>
            <selector title="附加投保人豁免保费" :options="list" placeholder="请选择" v-model="isInsure2" id='add'  @on-change='getInsurePersonIdCardNum'></selector>
            <!--<selector title="附加轻症疾病" :options="addRisktList" placeholder="请选择" v-model="addRiskIndex" @on-change='getInsurePersonIdCardNum'></selector>-->
            <selector title="缴费年期" :options="payTermList" placeholder="请选择" v-model="payTermIndex" @on-change='getInsurePersonIdCardNum'></selector>
            <selector title="保障期限" :options="insureYearsList" placeholder="请选择" v-model="insureYear" @on-change='getInsurePersonIdCardNum'></selector>
        </group>
        <group  :gutter=10>
            <cell title='受益人信息' >
                <img slot="icon" width="20" style="display:block;margin-right:5px;"  :src="picSrc">
            </cell>
            <selector title="受益人" :options="beneficiaryList1" v-model="beneficiary" placeholder="请选择" readonly></selector>
        </group>
        <group  :gutter=10>
            <cell title='续期账户信息' >
                <img slot="icon" width="20" style="display:block;margin-right:5px;"  :src="picSrc">
            </cell>
            <cell title="账户开户名"  value-align='left' class='default-width'>{{applicantName==null||applicantName==""?"默认投保人姓名":applicantName}}</cell>
            <cell title="身份证号"  value-align='left' class='default-width'>{{applicantIdCard==null||applicantIdCard==""?"默认投保人身份证号":applicantIdCard}}</cell>
            <selector title="开户行" :options="bankList" v-model="bank" placeholder="请选择"  ></selector>
            <x-input   keyboard="number"  type="tel" required title="借记卡卡号"  placeholder="用于续保缴费扣款使用" text-align='left' v-model.trim="credit" :is-type="this.tool.validateBankCard" ref='creditRef'></x-input>
            <!--<x-input title="电话号码" type="tel"  required placeholder="请填写开卡预留手机" text-align='left' v-model.trim="mobilePhone" is-type="china-mobile" ref='mobilePhoneRef'></x-input>-->
            <cell title="电话号码"  value-align='left' class='default-width'>{{applicantPhone==null||applicantPhone==""?"开卡预留手机（默认投保人手机号）":applicantPhone}}</cell>
            <!--       <x-input required title="验证码" class="weui-vcode"  keyboard="number" v-model='identifyCode' placeholder="验证码" ref='identifyCodeRef'>
                       <x-button  v-show="sendAuthCode" @click.native="getAuthCode" slot="right" type="primary" mini>获取验证码(60)</x-button>
                       <x-button  v-show="!sendAuthCode" @click.native="getAuthCode" slot="right" type="primary" mini>{{auth_time}} 秒后重新发送</x-button>
                   </x-input>-->
        </group>


        <div class="clause_confirm" >
            <check-icon :value.sync="ischeck"> </check-icon>
            <span style='line-height: 1.5rem;font-size: 0.82rem;'>我已认真阅读<a class='a_link' @click='showDesc=true'>《投保须知》</a>、<a class='a_link' href='https://www.supplyfintech.com/insurance_clause/kanglerenshen1.pdf'>《人身保险投保提示书》</a>、<a class='a_link' href='https://www.supplyfintech.com/insurance_clause/kanglekoukuantongyishu1.pdf'>《扣款知情同意书》</a>并同意上述协议约定</span>
            <p class='t-source'>本产品由复星联合健康保险股份有限公司承保</p>
            <p class='t-source'>复星联合健康保险股份有限公司是保监会批准设立的专业健康保险公司，公司总部在广东省广州市。</p>
            <p class='t-source'>温馨提示：投被保人信息绝对保密，仅供保单投保使用</p>
        </div>
        <flexbox :gutter="0" class="oprations">
            <flexbox-item :order="1"  :span="1/6">
                <div class="plan-desc"  style='text-align: right'>保费：</div>
            </flexbox-item>
            <flexbox-item :span="1/3" :order="1" >
                <div class="plan-price" style='text-align: left'>￥ {{planPrice | formatMoney}}</div>
            </flexbox-item>
            <flexbox-item :order="2">
                <div class="plan-buy"   @click="insured">立即投保</div>
            </flexbox-item>
        </flexbox>
        <div v-transfer-dom>
            <popup v-model="showDesc" position="bottom" max-height="70%">
                <div class='close' @click="showDesc = false" >
                    <x-icon type="ios-close-empty" size="30"></x-icon>
                </div>
                <group>
                    <div title='产品条款' class='divstyle clause'>
                        <p class='pstyle' >保险条款</p>
                        <cell :title="clause[0]" link="https://www.supplyfintech.com/insurance_clause/kangleCclause01.pdf" class='linkClause'></cell>
                        <cell :title="clause[1]" link="https://www.supplyfintech.com/insurance_clause/kanglemianzhongclause1.pdf" class='linkClause'></cell>
                    </div>
                    <div class='divstyle'>
                        <p><strong>投保须知</strong></p>
                        <p><strong>【保险公司】</strong></p>
                        <p>本产品由复星联合健康保险股份有限公司承保。</p>
                        <p>复星联合健康保险股份有限公司是保监会批准设立的专业健康保险公司，公司总部在广东广州。</p>
                        <p><strong>【产品介绍】</strong></p>
                        <p>1.适用人群：</p>
                        <p>投保人必须是被保险人本人或被保险人的父母、配偶、子女，且投保人的年龄≥18周岁。</p>
                        <p>投保时年龄在30天-50周岁、身体健康、能正常工作或正常生活的自然人可作为本保险的被保险人。投保时不足一周岁的婴儿，应当出生满30天且已健康出院。</p>
                        <p>2.职业范围：职业类别为1-6类的人群，职业类别参照《复星联合健康职业分类表》。</p>
                        <p>3.犹豫期 : 15天</p>
                        <p>4.等待期：180天</p>
                        <p>5.缴费期间：您可选择缴费期间为5年、10年、15年、20年和30年</p>
                        <p>6.保险期间 : 您可选择保至70岁、80岁或至终身</p>
                        <p>7.本产品仅限广东省辖区、北京市辖区销售</p>
                        <p><strong>【重要告知】</strong></p>
                        <p>1. 保险人就投保人、被保险人的有关情况提出询问的，您应当如实告知。对于故意未如实告知的既往症相关的重大疾病，保险人不承担保险责任，并可以解除合同且不退还保险费。</p>
                        <p>2. 既往症：指在保险人对其保险责任生效之前被保险人已知或应该知道的有关疾病或症状。</p>
                        <p>3. 对于因非意外的原因导致的保险责任，本合同生效日起 180 天内（含第 180天）为等待期。等待期内发生的重大疾病，保险人不承担保险责任。</p>
                        <p>4. 本计划为网络销售产品，在线投保后系统会进行核保，核保通过的标准体将即时出具电子保单。</p>
                        <p>5. 您可通过复星联合健康保险全国客服热线4006-11-7777或登录官网（www.fosun-uhi.com）及官方微信公众号进行保单查询、验真。</p>
                        <p>6. 复星联合健康保险股份有限公司综合偿付能力充足率、风险综合评级等信息请查询我司官网“公开信息披露”下的“偿付能力信息”栏目（网址：www.fosun-uhi.com ）。截止当前，我司偿付能力充足率达到监管要求。</p>
                        <p><strong>【温馨提示】</strong></p>
                        <p>1. 本保险采用电子保单形式承保，不提供纸质保单。依据《中华人民共和国电子签名法》，电子保单与纸质保单有同等法律效力，也可作为理赔的依据。您可通过复星联合健康保险官网（www.fosun-uhi.com）对电子保单进行验真。</p>
                        <p>2. 复星联合健康保险全国统一客服热线4006-11-7777。</p>
                        <p>3. 投保前，请您认真阅读产品页面展示内容、保险责任、责任免除、合同解除、《复星联合康乐一生重大疾病保险（C款升级款）条款》、《复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款》、复星联合在线信息披露(www.fosun-uhi.com)以及《人身险投保提示书》等重要内容。</p>
                    </div>
                </group>
            </popup>
        </div>
        <div v-transfer-dom>
            <popup v-model="showProfession" class='rightPop' position='right' width='70%'  @on-hide='closeProfessionPop'>
                <div class='position-horizontal-demo'>
                    <div class='head animated'>
                        <div class='pop-top'>
                            <div class='left' @click='returnProfession'><div class="back"><i class="iconfont">&#xe601;</i></div></div>
                            <div class='center'>职业类别</div>
                            <div class="right" @click='closeProfessionPop'><div class="v-close"><i class="iconfont">&#xe647;</i></div></div>
                        </div>
                        <div class='text'>
                            <p class='selected'>已选：{{selProfessionDesPath}} <br>
                                <span  class='pass'>{{professionValidDes}}</span>
                            </p>
                        </div>
                    </div>
                    <div class='content actived delay'>
                        <ul  class="level">
                            <li class="" v-for='(item,index) in showProfessionList' @click='clickProfession(index)'>
                                <span class="c-open-list-item">{{item.des}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </popup>
        </div>
        <div v-transfer-dom id='pay'>
            <popup v-model="showPayPop" height='70%' style='background: #ffffff'>
                <div class='pay'>
                    <div class="vux-popup-header">
                        <div class="vux-popup-header-left"><i class="iconfont" style='opacity: 0'>&#xe647;</i></div>
                        <div class="vux-popup-header-title">确认付款</div>
                        <div class="vux-popup-header-right"><i class="iconfont" @click='showPayPop=false;'>&#xe647;</i></div>
                    </div>
                    <group gutter="0">
                        <div style='font-size: 1.8rem;text-align: center;padding: 1.5rem 0;'>
                            <p>￥{{planPrice | formatMoney}}</p>
                        </div>
                        <cell title='订单信息'  value-align='right'  v-model='info'  class='info'></cell>
                        <cell title='付款方式'  value-align='right'  v-model='payment[radioValue]'   class='info' is-link @click.native='showPaySelectFn'></cell>
                    </group>
                    <div class='footer' @click='payOrder'>支付</div>
                </div>
                <div class='bankCard fadeout'>
                    <div class="vux-popup-header">
                        <div class="vux-popup-header-left"><i class="iconfont" @click='showPayFn'>&#xe601;</i></div>
                        <div class="vux-popup-header-title">请选择支付方式</div>
                        <div class="vux-popup-header-right"><i class="iconfont" @click='showPayPop=false'>&#xe647;</i></div>
                    </div>
                    <group gutter="0">
                        <radio :options="radioCheckList" v-model="radioValue" @click.native='showPayFn'></radio> <!--3-->
                    </group>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import professionData from '../../../static/js/getProfessionList.js'
    let ChinaAddressDataSelfDefined= require('../../../static/js/china_address_self_defined.json');
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
//        ChinaAddressDataSelfDefined,
        XAddress,
        PopupPicker,
        CheckIcon,
        Popup,
        PopupHeader,
//    Checklist,
        Value2nameFilter as value2name,
        Datetime,
        Selector,
        AlertModule, Alert
    } from 'vux'
    export default {
        name: 'applicant',
        directives: {
            TransferDom
        },
        beforeRouteLeave(to, from, next){
            console.log('beforeRouteLeave')
            this.saveInfo()
            next()
        },
        data(){
            let urlSplit=location.hash.split("?")[1];
            if(urlSplit.indexOf('&amp')!=-1){
                urlSplit=urlSplit.replace(/&amp%3B/g,'&')
            }
            let queryObj = querystring.parse(urlSplit);
//            console.log(location.hash.split("?")[1])
//            console.log(typeof queryObj)
//            console.log(JSON.stringify(queryObj))
            return {
                submitData:null,
                picSrc:require('../../../static/images/icon.png'),
//                planIndex:5,
                addRiskIndex:0,
//                payTermIndex: '20',
                planIndex:decodeURIComponent(queryObj.planIndex||''),
                payTermIndex:decodeURIComponent(queryObj.payTermIndex||''),
                insureYear:decodeURIComponent(queryObj.insureYear||''),
                serialNo:decodeURIComponent(queryObj.serialNo||''),
                beneficiary:'0',
                amountList:[
                    {key:'0',value:'5万',val:'50000'},
                    {key:'1',value:'10万',val:'100000'},
                    {key:'2',value:'15万',val:'150000'},
                    {key:'3',value:'20万',val:'200000'},
                    {key:'4',value:'25万',val:'250000'},
                    {key:'5',value:'30万',val:'300000'},
                    {key:'6',value:'35万',val:'350000'},
                    {key:'7',value:'40万',val:'400000'},
                    {key:'8',value:'45万',val:'450000'},
                    {key:'9',value:'50万',val:'500000'},
                ],
                addRisktList:[
                    {key:'0',value:'投保'},
                    {key:'1',value:'不投保'},
                ],
                payTermList:[
//                    {key:'1',value:'趸交'},
                    {key:'5',value:'5年交'},
                    {key:'10',value:'10年交'},
                    {key:'15',value:'15年交'},
                    {key:'20',value:'20年交'},
                    {key:'30',value:'30年交'},
                ],
                insureYearsList:[
                    {key:'70',value:'至70周岁'},
                    {key:'80',value:'至80周岁'},
                    {key:'105',value:'至终身'},
                ],
//                insureYear:'80',
                beneficiaryList1:[ {key:'0',value:'法定受益人'},{key:'1',value:'指定受益人'}],
                bankList:[
                    {
                        value: "工商银行",
                         key: "9001",
                    },
                    {
                        value: "民生银行",
                         key: "9003",
                    },
                    {
                        value: "交通银行",
                         key: "9007",
                    },
                    {
                        value: "农业银行",
                         key: "9010",
                    },
                    {
                        value: "浦发银行",
                         key: "9011",
                    },
                    {
                        value: "光大银行",
                         key: "9013",
                    },

                    {
                        value: "华夏银行",
                         key: "9019",
                    },
                    {
                        value: "广发银行",
                         key: "9020",
                    },
                    {
                        value: "平安银行",
                         key: "9039",
                    },
                ],
                list:[
                    {key:'0',value:'不投保',},
//                    {key:'1',value:'投保',},
                ],
                bank:'9001',
                showDesc: false,
                isFetching: false,
                ischeck: true,
                isShow: false,
                /*     showPay:true,
                 showPaySelect:false,*/
                showPayPop:false,//fixme syy

                info:'康乐一生C款重疾保险',
                payment: {
                    1: '银行转账（线下)',
                    2: '保司收银台',
                    3: '微信',
                    4: '支付宝',
                    5: '银联'
                },
//                payType:'',
                radioValue:3,

                radioCheckList:[
                    {
                        "icon": require('../../../static/images/weixin.png'),
                        "key": "3",
                        "value": "微信"
                    },
                    {
                        "icon": require('../../../static/images/yinlian.png'),
                        "key": "5",
                        "value": "银联"
                    }
                ],
                clause: ['复星联合康乐一生重大疾病保险（C款升级款）条款', '复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款'],
                relationNumber: 0,
                copyUserData: null,
                cardTypeList: [{key: '01', value: '身份证'}, {key: '02', value: '护照'}],
                applicantTaxpayerList: [{key: '1', value: '仅为中国税收居民'}, {key: '2', value: '仅为非居民'},{key:'3',value:'既是中国税收居民又是其他国家（地区）税收居民'}],
                relationList: [[]],
                assured: ['本人'],
                relationData: [
                    {'label': '0', 'value': '本人'},
                    {'label': '1', 'value': '配偶'},
                    {'label': '2', 'value': '父母'},
                    {'label': '3', 'value': '子女'},
                ],
                isInsure2:'0',
//                planNo: decodeURIComponent(queryObj.planNo || ''),//方案编号,
                planPrice: decodeURIComponent(queryObj.price || ''),//方案价格,
                planInfo: decodeURIComponent(queryObj.planInfo || ''),//方案信息,
                applicantName: '',
                applicantAddress: [],
                applicantAddressDetail: '',
                applicantPropertyZip: '',
                applicantPhone: '',
                applicantMail:'',
                applicantCardType:'01',//默认身份证类型
                applicantIdCard:'',
                applicantTaxResidents:'1',//
                addressDefault: '北京市、上海市、广东省',

                insuredName:"",
                insuredCardType:'01',
                insuredIdCard:'',
                insuredPhone: "",
                profession:[],//职业
                stature:'',//身高
                Weight:'',//体重

//                addressData: ChinaAddressData,
                addressData: ChinaAddressDataSelfDefined,

                startDate: '',//开始日期
                startDateNextDay: '',

                showProfession:false,
                professionList:[],
                showProfessionList:[],
                isSelLeaf:false,  //当前选择的是否是叶子节点（用户是否已完成选择）
                selProfessionIndex:[],
                selProfessionDes:[],
                selProfessionDesPath:"",
                professionValidDes:"",
//              professionVal:0,
                professionCode:'',
                professionNum:0,

                credit:'',//银行卡
                mobilePhone:'',//开户手机

                sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
                auth_time: 60, /*倒计时 计数器*/
                auth_timetimer:'',
                identifyCode:'',//验证码
                proposalNo:'',
                maxAmountNum:0,
                maxProfessionNum:0,
//                maxPaymentYearNum:0,
            }
        },
        components: {
            Group,
            Cell,
            Loading,
            Flexbox,
            FlexboxItem,
            Radio,
            XInput,
            XButton,
//            ChinaAddressDataSelfDefined,
            XAddress,
            PopupPicker,
            CheckIcon,
            Popup,
            PopupHeader,
            Datetime,
            Selector,
            AlertModule,
            Alert,
             md5
        },
        methods: {

            //显示支付选择
            showPaySelectFn(){
                document.getElementsByClassName('bankCard')[0].className = 'bankCard fadein';
                document.getElementsByClassName('pay')[0].className = 'pay fadeout';
            },
            showPayFn(){
                document.getElementsByClassName('bankCard')[0].className = 'bankCard fadeout';
                document.getElementsByClassName('pay')[0].className = 'pay fadeIn';
//                if(radioValue==3){
//                    this.payment=''
//                }
            },
            //保费计算data组装
            premiumCalculation(age1,age2,sex1,sex2){
                let account = process.env.fuxingAccount;
                let privateKey = process.env.fuxingPrivateKey;
                let reqTid = new Date().getTime();
                var countData = {
                    "account": account,
                    "reqTid": reqTid, //JHKJtest0001
//                    sign: sign,
                    data: JSON.stringify({
                        "planNo": "JHFUHIKLCA0001",
                        "insuredSex": sex2, //被保人
                        "applicantSex": sex1, //投保人
                        "applicantAge": age1,//投保人年龄
                        "insuredAge":age2,//被保人年龄
                        "appInsSame":this.relationNumber, //投保人是否为被保险人 0不是1是
                        "payYears": this.payTermIndex,  //缴费期
                        "amount": this.amountList[this.planIndex].val, //保额
                        "insureYears": this.insureYear, //保障期间
                        "ifAddHuoMian":this.isInsure2
                    })
                };
                countData.sign=md5("account" + account + "data" + countData.data + "reqTid" + reqTid + privateKey).toString().toUpperCase();
                this.submitData=countData
            },
            changeHuomian(){
                if(this.relationNumber==0){
                    this.isInsure2='0';
                    this.list=[
                        {key:'0',value:'不投保'},
                    ];
                }else {
                    this.list=[
                        {key:'0',value:'不投保'},
                        {key:'1',value:'投保'}
                    ]
                }
            },
            //保费试算请求
            ajaxDataQuery(){
//                this.premiumCalculation();
//                let url=process.env.BASE_URL+':8765/insurance/fosun/premiumTrial';
                let url=process.env.BASE_URL+process.env.commonPort+'/insurance/fosunklc/premiumTrial';
                this.$http.post(url,this.submitData).then(({data}) => {
                    console.log(data);
                    switch(data.resCode){
                        case '0000'://成功
                            this.planPrice=data.data.totalPremium;
                            break;
                        case '1001'://账号不存在或被禁用
                            this.showToast(data.resMsg)
                            break;
                        case '1002'://
                            this.showToast(data.resMsg)
                            break;
                        case '1003'://必填写项为空
                            this.showToast(data.resMsg)
                            break;
                        case '1004'://验签失败
                            this.showToast(data.resMsg)
                            break;
                        case '9999'://系统异常
                            this.showToast(data.resMsg)
                            break;
                        default:
                        //
                    }
                });
            },
            getInsurePersonIdCardNum(){
                this.changeHuomian();
                if(this.relationNumber==0){
                    //选择的是【本人】，则使用投保人身份证号
                    if(this.$refs.applicantcid.valid == true){
                        console.log('pass-applicant')
                        let strIdCard=this.tool.idcardConvert(this.applicantIdCard)
                        let sex1=this.tool.getSex(this.applicantIdCard)
                        console.log('投保人性别='+sex1)
                        let age1=this.tool.GetAge(strIdCard);
                        console.log('投保人age1='+age1)
                        //发请求查询保费
                        if(age1>50){
                            this.showToast('投保年龄超出范围')
                            return false;
                        }
                        this.maxAmountNum=this.getBaoeRangeMaxByAge(age1);//可选保额最大范围的最大值
                        if(this.planIndex>this.maxAmountNum){
                            this.showToast('被保人年龄'+age1+ '岁，保障额度上限最多为'+this.amountList[this.maxAmountNum].value+'请重新选择');
                            return false;
                        }
                        this.changeDateOrTerm(age1)
                        this.premiumCalculation(age1,age1,sex1,sex1)
                        this.ajaxDataQuery()
                    }
                }else{
                    if(this.$refs.insuredcid.valid == true){
                        console.log('pass-insured')
                        let strIdCard1=this.tool.idcardConvert(this.applicantIdCard)
                        let strIdCard2=this.tool.idcardConvert(this.insuredIdCard)

                        let age1=this.tool.GetAge(strIdCard1);
                        let age2=this.tool.GetAge(strIdCard2);
                        let sex1=this.tool.getSex(this.applicantIdCard)
                        let sex2=this.tool.getSex(this.insuredIdCard)
                        console.log('被保人性别='+sex2)
                        console.log('被保人age2='+age2)
                        //发请求查询保费
                        if(age2>50){
                            this.showToast('投保年龄超出范围')
                            return;
                        }
                        this.maxAmountNum=this.getBaoeRangeMaxByAge(age2);//可选保额最大范围的最大值
                        if(this.planIndex>this.maxAmountNum){
                            this.showToast('被保人年龄'+age2+ '岁，保障额度上限最多为'+this.amountList[this.maxAmountNum].value+'请重新选择');
                            return false;
                        }
                        this.changeDateOrTerm(age2)
                        this.premiumCalculation(age1,age2,sex1,sex2)
                        this.ajaxDataQuery()
                    }
                }
            },
            changeDateOrTerm(age){
                let oldKey=this.payTermIndex;//在这里，获取一下原来的选中项，放到这个变量
                if(age>=40){
                    this.payTermList=this.payTermList.slice(0,4);
                    if(oldKey=="30"){
                        //原选中项已经无效，需要把下拉控件的选中项设为一个默认值
                        this.payTermIndex="20"
                    }
                }else{
                    this.payTermList.push({key:'30',value:'30年交'})
                }
            },
            //初始化关系列表
            initRelation(){
                for (let i in this.relationData) {
                    let value = this.relationData[i].value;
                    this.relationList[0].push(value)
                }
            },
            //选择本人获取关系
            changeRelationPicker(){
                this.assured == '本人' ? this.isShow = false : this.isShow = true;
                for (let i in this.relationData) {
                    let label = this.relationData[i].label;
                    let value = this.relationData[i].value;
                    if (this.assured == value) {
                        this.relationNumber = label;//要提交的是数字类型 this.relationNumber
                        this.getInsurePersonIdCardNum()
                    }
                }
            },
            insured(){
                if(this.validateInputVal()==false){
                    return ;
                }else {
                    this.fuxingApply()
//                    this.showPayPop=true;
                }

            },
            /**
             * 根据年龄获取保额范围限制（保额范围是从list截取的一部分range [left, right]，该函数返回right值。left固定=0）
             * */
            getBaoeRangeMaxByAge(age){
                if(age<=17){
                    return 5
                }
                if(age<=40){
                    return 9
                }
                if(age<=45){
                    return 7
                }
                if(age<=50){
                    return 5
                }
                return 0;
            },
            /**
             * 根据职业类别获取保额范围限制（保额范围是从list截取的一部分range [left, right]，该函数返回right值。left固定=0）
             **/
            getBaoeRangeMaxByProfession(professionNum){
                if(professionNum>=3){
                    return 3
                }else{
                    return 9
                }
            },
            validateInputVal(){
                var that=this;
                this.maxProfessionNum=this.getBaoeRangeMaxByProfession(this.professionNum);//可选职业类别最大范围的最大值
                if (this.professionNum> this.maxProfessionNum) {
                    if(parseInt(this.planIndex)>3) {
                        this.showToast('职业类别5-6类保障额度上限为' + this.amountList[this.maxProfessionNum].value);
                        return false;
                    }
                }

                if(this.relationNumber==0){ //投保人关系
                    if(this.validateApplicant()==false){
                        return false;
                    }
                    if(this.validateCommon()==false){
                        return false;
                    }
                    if(this.validateAccountInfo()==false){
                        return false;
                    }
                    if (this.ischeck==false) {
                        this.$vux.toast.show({
                            text: '请阅读投保须知',
                            type: 'text',
                            onHide() {
                                that.scroll('clause_confirm')
                            }
                        });
                        return false;
                    }
                }else {
                    if(this.validateApplicant()==false){
                        return false;
                    }
                    if(this.validateInsured()==false){
                        return false;
                    }
                    if(this.validateCommon()==false){
                        return false;
                    }
                    if(this.validateAccountInfo()==false){
                        return false;
                    }
                    if (this.ischeck==false) {
                        this.$vux.toast.show({
                            text: '请阅读投保须知',
                            type: 'text',
                            onHide() {
                                that.scroll('clause_confirm')
                            }
                        });
                        return false;
                    }
                }
            },

            //校验投保人
            validateApplicant(){
                if(this.getInsurePersonIdCardNum()==false){return false;}
                if(this.validateWarnTip(this.applicantName,'投保人姓名不能为空')==false){ return false;}
                if(this.validateWarnTip(this.applicantIdCard,'投保人证件号不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.applicantcid.valid,'投保人证件号码格式错误')==false){ return false;}
                if(this.validateWarnTip2(this.tool.validateAge(this.applicantIdCard),'请检查投保人身份证信息，投保人年龄必须大于18周岁')==false){ return false;}

                if(this.validateWarnTip(this.applicantPhone,'投保人电话号码不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.applicantPhoneRef.valid,'投保人电话号码有误')==false){ return false;}
                if(this.validateWarnTip(this.applicantMail,'投保人电子邮箱不能为空')==false){  return false;}
                if(this.validateWarnTip2(this.$refs.applicantMailRef.valid,'投保人电子邮箱有误')==false){  return false;}
                if(this.applicantAddress.length==0){ this.showToast('联系地址不能为空');  return false;}
                if(this.validateWarnTip(this.applicantAddressDetail,'详细地址不能为空')==false){  return false;}
                if(this.validateWarnTip(this.applicantPropertyZip,'邮政编码不能为空')==false){  return false;}
                if(this.validateWarnTip2(this.$refs.applicantPropertyZipRef.valid,'邮政编码为6位纯数字')==false){  return false;}
            },
            //校验被保人
            validateInsured(){
                if(this.getInsurePersonIdCardNum()==false){return false;}
                if(this.validateWarnTip(this.insuredName,'被保人姓名不能为空')==false){ return false;}
                if(this.validateWarnTip(this.insuredIdCard,'被保人证件号码不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.insuredcid.valid,'被保人证件号码格式错误')==false){ return false;}
                if(this.validateWarnTip(this.insuredPhone,'被保人电话号码不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.insuredPhoneRef.valid,'被保人电话号码格式错误')==false){ return false;}
            },
            //校验公共部分
            validateCommon(){
                if(this.validateWarnTip(this.professionCode,'职业类别不能为空')==false){ return false;}
                if(this.validateWarnTip(this.stature,'身高不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.statureRef.valid,'身高必须为10-299的整数!')==false){ return false;}
                if(this.validateWarnTip(this.Weight,'体重不能为空')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.WeightRef.valid,'体重必须为0-999,可保留一位小数')==false){ return false;}
            },
            //校验账户
            validateAccountInfo(){
                if(this.applicantName==''||this.applicantIdCard==''||this.credit==''||this.applicantPhone==''){ this.showToast('姓名，身份证，开户行卡号，电话号码四要素不能为空'); return false;}
                if(this.validateWarnTip2(this.$refs.creditRef.valid,'银行卡必须16或19位纯数字')==false){ return false;}
                if(this.validateWarnTip2(this.$refs.applicantPhoneRef.valid,'预留手机号码格式有误')==false){ return false;}
                /*       if(this.validateWarnTip(this.identifyCode,'验证码不能为空')==false){ return false;}*/
            },

            clickProfession(index){
                if(this.isSelLeaf){
                    //删除最后一个元素
                    this.selProfessionIndex.splice(-1);
                    this.selProfessionDes.splice(-1);
                }
                this.selProfessionIndex.push(index);
                var des=this.showProfessionList[index].des;
                this.selProfessionDes.push(des);
                this.refreshShowProfession();
            },
            // 职业类别选择 点击左上角 返回上一级
            returnProfession(){
                if(this.selProfessionIndex.length==0){
                    this.showProfession=false;
                }
                if(this.isSelLeaf){
                    //删除最后一个元素
                    this.selProfessionIndex.splice(-1);
                    this.selProfessionDes.splice(-1);
                }
                //返回上一级，只需从路径中删除最后一个元素
                this.selProfessionIndex.splice(-1);
                this.selProfessionDes.splice(-1);
                this.refreshShowProfession();
            },
            refreshShowProfession(){
                var showList=this.professionList;
                for(var i in this.selProfessionIndex){
                    var index=this.selProfessionIndex[i]
                    var node=showList[index];
                    if(node.children) {
                        //存在children，说明不是最后一级
                        //替换为子树
                        showList = showList[index].children;
                        this.professionValidDes="";
                        this.isSelLeaf=false;
                    }else{
                        //不存在children，说明是最后一级的选项，用户已经完成选择
                        var str="类别：";
//                      this.professionVal=node.val;
//                      this.professionCode=node.code;
                        str+=node.val;
                        this.professionNum=node.val
                        if(node.val>=1&&node.val<=6){
                            str+=" （符合投保条件）";
                            document.getElementsByClassName('pass')[0].className='pass'
                            this.showProfession=false;
                            this.profession=node.val+'类 '+this.selProfessionDes.pop();
                            this.professionCode=node.code;
                            console.log('this.professionCode='+this.professionCode)
                        }else{
                            str+=" （不符合投保条件）";
                            document.getElementsByClassName('pass')[0].className='pass pass-error'
                        }
                        this.professionValidDes=str;
                        this.isSelLeaf=true;
                    }
                }
                this.showProfessionList=showList;

                //根据选择的路径，构建字符串
                var pathText="";
                if(this.selProfessionDes.length>0){
                    pathText=this.selProfessionDes.join(" - ")
                }
                this.selProfessionDesPath=pathText;
            },
            getProfessionList(){
                this.professionList=professionData.data.professionList;
                this.refreshShowProfession();
            },
            //关闭职业类别t弹框清空数据
            closeProfessionPop(){
                this.showProfession=false
                if(this.showProfession==false){
                    this.selProfessionIndex.length=0
                    this.selProfessionDes.length=0
                    this.selProfessionDesPath="";
                    this.professionValidDes="";
                }
                this.refreshShowProfession();
            },
            //验证码计时器
//            getAuthCode() {
//                if(this.applicantName==''||this.applicantIdCard==''||this.credit==''||this.mobilePhone==''){ this.showToast('姓名，身份证，开户行卡号，电话号码四要素不能为空'); return;}
//                if(this.validateWarnTip2(this.$refs.creditRef.valid,'银行卡必须16或19位纯数字')==false){ return;}
//                if(this.validateWarnTip2(this.$refs.mobilePhoneRef.valid,'预留手机号码格式有误')==false){ return;}
//                else {
//                    this.sendAuthCode = false;
//                    this.auth_time = 60;
//                    this.auth_timetimer =  setInterval(()=>{
//                        this.auth_time--;
//                        if(this.auth_time<=0){
//                            this.sendAuthCode = true;
//                            clearInterval(this.auth_timetimer);
//                        }
//                    }, 1000);
//                }
//            },
            showToast(text){
                this.$vux.toast.show({
                    text: text,
                    type:'text',
                    width:'10em',
                })
            },
            payOrder(){
//                alert('发出支付请求')
                this.payQuery(this.proposalNo)
            },
            //校验警告提示
            validateWarnTip(param,text){
                if(param==''){
                    this.showToast(text)
                    return false;
                }
            },
            validateWarnTip2(param,text){
                if(param==false){
                    this.showToast(text)
                    return false;
                }
            },
            /*          scroll(name){
             let domName=name;
             let className= document.getElementsByClassName(domName)[0];
             var target = className;
             // 使用定时器是为了让输入框上滑时更加自然
             setTimeout(function(){
             target.scrollIntoView(true);
             },100);
             },*/
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
                        'applicantName':this.applicantName,
                        'applicantIdCard':this.applicantIdCard,
                        'applicantPhone':this.applicantPhone,
                        'applicantMail':this.applicantMail,
                        'applicantAddress':this.applicantAddress,
                        'applicantAddressDetail':this.applicantAddressDetail,
                        'applicantPropertyZip':this.applicantPropertyZip,
                        'insuredName':this.insuredName,
                        'insuredIdCard':this.insuredIdCard,
                        'insuredPhone':this.insuredPhone,
                        'professionCode':this.professionCode,
                        'profession':this.profession,
                        'stature':this.stature,
                        'Weight':this.Weight,
                        'credit':this.credit,
//                        'mobilePhone':this.applicantPhone,
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
                this.applicantAddress=jsonData.applicantAddress;
                this.applicantAddressDetail=jsonData.applicantAddressDetail;
                this.applicantPropertyZip=jsonData.applicantPropertyZip;
                this.insuredName=jsonData.insuredName;
                this.insuredIdCard=jsonData.insuredIdCard;
                this.insuredPhone=jsonData.insuredPhone;
                this.professionCode=jsonData.professionCode;
                this.profession=jsonData.profession;
                this.stature=jsonData.stature;
                this.Weight=jsonData.Weight;
                this.credit=jsonData.credit;
//                this.mobilePhone=jsonData.mobilePhone;
            },
            /*提交 方案*/
            fuxingApply(){
                this.isFetching = true;
                /*配置信息相关*/
                var reqTid = new Date().getTime();
                var account =process.env.fuxingAccount;
                var privateKey = process.env.fuxingPrivateKey;
console.log('this.applicantAddress='+this.applicantAddress)
                /*配置信息相关*/
                var userData= {
                    "account": account,
                    "reqTid": reqTid,
//                    "sign": sign,
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
                                address: value2name(this.applicantAddress,this.addressData)+ ' ' +this.applicantAddressDetail,
//                                sex: this.sexNumber,
                            },
                        },
                        insuredList: [{
                            type: '0',
                            naturePerson: {
                                name: this.insuredName,
                                paperworkType: "01",
                                paperworkNo: this.tool.idcardConvert(this.insuredIdCard),
                                phone: this.insuredPhone,
                                mail: this.insuredMail,
//                                sex: this.sexNumber2,
                            },
                        }],
                        beneficiaryList: [],//受益人
                        extendInfo: {
                            payYears:this.payTermIndex,
                            insureYears:this.insureYear,
                            startDate:"2018-09-01", //这个问下
                            jobCode:this.professionCode,
                            amount:this.amountList[this.planIndex].val,
                            province:this.applicantAddress[0],
                            city:this.applicantAddress[1],
                            country:this.applicantAddress[2],
                            postCode:this.applicantPropertyZip,
                            height:this.stature,
                            weight:this.Weight,
                            bankCode:this.bank,
                            bankAccountName:this.applicantName,
                            bankAccountNo:this.credit,
                            bankAccountPhone:this.applicantPhone,//this.mobilePhone
                            serialNo:this.serialNo,
                            ifAddHuoMian:this.isInsure2
                        },
                        commonInfo: {
                            platNo: account,//平台编号
                            planNo: "JHFUHIKLCA0001",//产品方案编号
                            isGroup: '0',
                            appInsRelation: this.relationNumber,//投保人被保险人关系
                            insBenRelation: '0',//被保险人受益人关系
                            num: '1',//投保份数
//                            chanNo: 'bj001',//渠道编号（y）
//                            saleNo: "001",//业务员（y）
//              isAppInsSame: 0,//投保人是否为被保险人
//              isInsBenSame: 1,//被保险人是否为受益人
                        }
                    })
                };
                var sign = md5("account"+account+"data"+userData.data+"reqTid"+reqTid+privateKey).toString().toUpperCase();
                userData.sign = sign;
                //深拷贝 提交data内容
                this.copyUserData=JSON.parse(JSON.stringify(userData));
                this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/fosunklc/apply',this.copyUserData).then(({data}) => {
                    switch(data.resCode){
                        case '0000'://成功
                            this.isFetching = false;
                            console.log(data);
                            console.log(data.data);
                            let result=JSON.parse(data.data).result;
                            if(result==0){
                                let msg=JSON.parse(data.data).appReturnInfoList.resultMsg;
                                this.showToast(msg)
                                return;
                            }else {
                                this.proposalNo=JSON.parse(data.data).appReturnInfo.proposalNo
                                console.log('proposalNo='+this.proposalNo)
//                                process.env.BASE_URL!='http://47.104.104.38'? this.planPrice=0.01:this.planPrice=this.planPrice;
                                this.showPayPop=true;
                            }
                            break;
                        case '1001'://账号不存在或被禁用
                            this.showToast('账号不存在或被禁用')
                            break;
                        case '1002'://
                            this.isFetching = false;
                            this.showToast('参数为空或格式错误')
                            break;
                        case '1003'://必填写项为空
                            this.isFetching = false;
                            this.showToast('必填写项为空')
                            break;
                        case '1004'://验签失败
                            this.isFetching = false;
                            this.showToast('验签失败')
                            break;
                        case '9999'://系统异常
                            this.isFetching = false;
                            this.showToast('系统异常')
                            break;
                        default:
                    }
                });
            },
            payQuery(No){
                //如果是本地链接 或者测试连接  为payAmount:0.01 否则为  payAmount:this.planPrice

               let params={
                    accountBirthday:this.tool.GetAge(this.applicantIdCard),      //付款人生日   默认是投保人
                    accountGender:this.tool.getSex(this.applicantIdCard),               //付款人性别   默认是投保人
                    accountName:this.applicantName,  //姓名
                    bizNo:No,     //投保获取的 投保单号 proposalNo
                    idNo:this.tool.idcardConvert(this.applicantIdCard),     //身份证
                    payAmount:this.planPrice,            //支付金额还得根据具体金额适配
                    transDesc:"请求支付",         //描述
                    payType:this.radioValue,                 //支付类型   3  微信
                   bankName:this.applicantName,
                   bankCode:this.bank,
                   mobile:this.applicantPhone,
                   accountNo:this.credit,

                };
                process.env.BASE_URL!='https://service.supplyfintech.com/ins_consumer'&&this.radioValue==3? params.payAmount=0.01:params.payAmount=this.planPrice;
//                let params={proposalNo:No}
//                this.$http.post(process.env.BASE_URL+':8765/insurance/fosun/getPayURL',params).then(({data}) => {
                this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/fosun/getPayURL',params).then(({data}) => {
                console.log(JSON.parse(data.data).retCode)
                    switch(JSON.parse(data.data).retCode){
                        case 'SUCCESS'://成功
//                            this.isFetching = false;
                            if(this.radioValue==3){
                             let payurl=JSON.parse(data.data).wechatMainUrl;
                                window.open(payurl,'_self');
                            }
                            if(this.radioValue==5){
                                let payurl=JSON.parse(data.data).gateWayPayUrl;
                                window.open(payurl,'_self');
                            }
                            console.log(data);
                            break;
                        case 'FAIL'://账号不存在或被禁用
                            let retMsg=JSON.parse(data.data).retMsg
                            this.showToast(retMsg)
                            break;
                        default:
                    }
                });
            }
        },
        created(){
        },
        mounted(){
            this.initRelation();
            this.getProfessionList();
//            this.getInsurePersonIdCardNum();

            this.getInfo();
        },
        filters:{
            formatMoney(value) {
                return Number(value).toFixed(2)
            }
        }
    }
</script>

<style lang="scss" >
    @import "../../assets/css/fuxingInsured.scss";

    #add {
        .weui-label {
            line-height: 1;
            min-width: 100px;
            width: 105px;
            max-width: 100px;
            margin-right: 5px;
        }
    }
</style>
