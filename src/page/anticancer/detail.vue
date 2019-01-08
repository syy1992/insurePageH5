<template>
    <div id="anxin_detail">
        <img src="../../../static/images/anxin_banner.jpg" class="ban_img">
            <group :gutter=0>
                <!--下面日期联动-->
                <!--<cell :title='"选择方案"' :value="selectedPlan.name"  class='selectPlan'  @click.native="showPlanPopupPicker = true">-->
                    <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">-->
                <!--</cell>-->
                <!--下面日期联动-->
                <datetime format="YYYY-MM-DD"  v-model='defaultDate'   :start-date="endDate"  :end-date="startDate" title="出生日期" @on-confirm="onConfirmDate" @on-hide="log('hide', $event)" ></datetime>
                <!--<popup-picker :show.sync="showPlanPopupPicker" :title="pickertitle" :show-cell="false" :data="plans"  @on-change="onChange" ref="planpicker"></popup-picker>-->
            </group>
            <div class="plan-detail-wrap">
                <div class="back-top" @click="backTop">
                    <img src="../../../static/images/top.png">
                </div>
                <group  v-for="(item,index) in planDetails"   :gutter=10 :key='index'>
                    <cell :title='"保障利益"' >
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                    </cell>
                    <!--<cell primary="content" v-for="(planItem,index) in item.planItems" :title="planItem.title" :value="planItem.value" :key='index' class="planItem"></cell>-->
                    <cell title="癌症确诊费用保险金" value="200万" is-link :border-intent="false" :arrow-direction="showContent01 ? 'up' : 'down'" @click.native="showContent01 = !showContent01"></cell>
                    <cell v-if="showContent01" v-html='desc1' class='desc'></cell>
                    <cell title="癌症治疗费用保险金" value="200万" is-link  :border-intent="false"  :arrow-direction="showContent02 ? 'up' : 'down'" @click.native="showContent02 = !showContent02"></cell>
                    <cell v-if="showContent02" v-html='desc2' class='desc'></cell>
                    <cell  title="免赔额" value="0元"></cell>
                    <cell  title="生效日" value=" 投保成功后次日零时"></cell>
                </group>

                <group  :gutter=10 >
                    <cell primary="content"  title="保障期限" :value="period">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                    </cell>
                </group>
                <group  :gutter=10 >
                    <cell primary="content"  title="产品介绍">
                        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                    </cell>
                    <img src="../../../static/images/anxin_detail.jpg" class='detail_img'>
                </group>

                <grid :show-lr-borders="false" :show-vertical-dividers="false">
                    <grid-item @click.native="show2 =true">
                        <img slot="icon" src="../../../static/images/icon2.png">
                        <span slot="label">理赔服务</span>
                    </grid-item>
                    <grid-item @click.native="show3 =true">
                        <img slot="icon" src="../../../static/images/icon3.png">
                        <!--<x-icon type="ios-help-outline" size="30"   ></x-icon>-->
                        <span slot="label">常见问题</span>
                    </grid-item>

                </grid>
                <!--<popup-picker :show.sync="showPicker1"  :data="plans"  ref="picker" :show-cell="false"></popup-picker>-->
                <flexbox :gutter="0" class="oprations">
                    <flexbox-item :span="1/2" :order="1">
                        <div class="plan-price">￥ {{planPrice.name}}.00</div>
                    </flexbox-item>
                    <flexbox-item :order="2">
                        <div class="plan-buy"  @click='onConfirmPlan'>立即投保</div>
                    </flexbox-item>
                </flexbox>
            </div>

            <div v-transfer-dom>
                <popup v-model="show2" position="bottom" height="50%" >
                    <div class='close' @click="show2 = false" >
                        <x-icon type="ios-close-empty" size="30"></x-icon>
                    </div>
                    <group>
                        <div class='divstyle'>
                            <p  class='pstyle'>理赔服务</p>
                            <p style='margin-bottom: 10px;'>本计划由安心财产保险有限责任公司承保，您可以通过安心保险客户服务热线95303（人工受理时间7×24小时）进行报案理赔。</p>
                            <p>1.出险后请及时进行理赔报案；</p>
                            <p>2.在客服人员的指引下准备理赔资料申请理赔；</p>
                            <p>3.请将理赔申请书及理赔材料邮寄到理赔部门或转交到相应机构；</p>
                            <p>4.理赔部门审核确属保险责任范围，在赔付协议达成后进行赔付。</p>
                        </div>
                    </group>
                </popup>
            </div>

            <div v-transfer-dom>
                <popup v-model="show3" position="bottom" height="50%">
                    <div class='close' @click="show3 = false" >
                        <x-icon type="ios-close-empty" size="30"></x-icon>
                    </div>
                    <group>
                        <div class='divstyle'>
                            <p  class='pstyle'>常见问题</p>
                            <p class='question' style='margin-top: 0'>Q：癌症确诊费用保险金保障内容包括哪些？</p>
                            <p>A：癌症确诊费用保险金是指被保险人在等待期后经医院的专科医生确诊初次患有癌症，对于癌症确诊之日前30日内（含确诊日期当日）在医院治疗时发生的与确诊癌症相关的合理且必需的住院或相关门急诊医疗费用，包含医疗诊疗费、检查检验费等。</p>

                            <p class='question'> Q：癌症治疗费用保险金保障内容包括哪些？</p>
                            <p>A：癌症治疗费用保险金是指被保险人在等待期后经医院的专科医生确诊初次患有癌症，对于癌症确诊之日后在医院治疗时发生的与治疗癌症相关的合理且必需的住院或相关门急诊医疗费用，包含床位费、护理费、检查检验费、治疗费、药品费、医生诊疗费、手术费、重症监护病房床位费、中医治疗费等。</p>

                            <p class='question'> Q：等待期内发生的癌症医疗费用是否可以保障？</p>
                            <p>A：被保险人在等待期内经医院专科医生确诊发生癌症的，保险人不承担给付保险金的责任。 投保人为被保险人首次投保或非连续投保本合同时，自合同生效日起90日为等待期，投保人为被保险人连续投保本合同的无等待期。</p>
                        </div>
                    </group>
                </popup>
            </div>

        <div v-transfer-dom id='v-transfer'>
            <popup v-model="isShow" height='50%'>
                <popup-header  title="健康告知" :show-bottom-border="false" @on-click-right="isShow = false"> </popup-header>
                  <x-icon type="ios-close-empty" size="30" @click='isShow = false'></x-icon>
                   <div class='pop-main'>
                       <div class="contain">
                           <div>健康告知</div>
                           <p>1.被保险人是否有或者被怀疑患有癌症、恶性肿瘤、白血病、原位癌、癌前病变、乙肝大三阳（HBeAg+且HBsAg+）、慢性乙型或丙型肝炎、肝硬化、慢性萎缩性胃炎、溃疡性结肠炎、克隆病、包块、肿块、息肉、囊肿、肿瘤标记物*或病理学检查异常？</p>
                           <p>2.最近2年内被保险人是否患有以下不适或症状：反复头痛、长期发热、吞咽困难、咯血、呕血反复牙龈出血或鼻衄、肝区不适、甲状腺结节、淋巴结肿大、长期腹痛、腹水、血尿、便血或黑便、紫癜、消瘦（体重3个月内下降超过5公斤）</p>
                           <p>3.（女性适用）是否有不规则阴道出血、乳头异常溢液、糜烂或回缩、乳房表面皮肤凹陷、皱褶或皮肤收缩、宫颈肿物/上皮内瘤样病变、畸胎瘤、葡萄胎、绒毛膜癌或其他滋养细胞疾病？</p>
                           <p>4.被保险人是否吸烟(包括但不限于香烟、雪茄、水烟、鼻烟等)每天超过40支或每周饮酒大于等于50个单位? (每一个饮酒单位相当于1杯(300ml)啤酒,半杯葡萄酒,1两白酒)</p>
                           <p>5.被保险人直系亲属中是否有两人或者两人以上有或曾罹患癌症？</p>
                           <p>6.被保险人是否在投保其他保险公司恶性肿瘤产品时被拒绝投保、延期、加费或除外?</p>
                           <p><strong style="white-space: normal;">以上问题请按照被保险人实际情况填写：如其中1项问题为“是”，请选择（不符合）；如以上所有问题均为“否”，请选择（符合）！</strong></p>
                           <p style='font-size: 0.7rem;' >注：肿瘤标志物*：是指特征性存在于恶性肿瘤细胞或由恶性肿瘤细胞异常产生的物质，或是机体对肿瘤刺激反应而产生的物质，如甲胎蛋白（AFP）、癌胚抗原（CEA）、前列腺特异性抗原（PSA）、癌抗原125（CA125）、癌抗原199（CA199）、绒毛膜促性腺激素（HCG）等。</p>
                           <p><br></p>
                       </div>
                   </div>
                 <div class='pop-footer'>
                     <a class='pop-footer-btn no' @click='alertNo'>不符合</a><a class='pop-footer-btn ok' @click='confirmOk'>符合</a>
                 </div>
            </popup>
        </div>

    </div>
</template>

<script>
    import {
        XHeader,
        PopupPicker,
        Group,
        Cell,
        Loading,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem, Radio,CheckIcon,
        Grid, GridItem,
//        AlertModule, Alert,
        Divider, Card,
        Popup,  XButton,
        Checker, CheckerItem,
        Tab,
        TabItem,
        XDialog,
        Datetime,
//        PopupRadio,
        PopupHeader
    } from 'vux'

    export default {
        name: 'detail',
        directives: {
            TransferDom
        },
        data() {
            return {
                period: '一年',
                val: 1,
                defaultDate:'2007-01-07',
//                checkList: null,
                ischeck: false,
                isShow: false,
                show1: false,
                show2: false,
                show3: false,
                showPop:false,
                showHideOnBlur:false,
                /*title相关*/
                title: "保障权益",
                /*planpicker相关的数据 start*/
                pickertitle: '保障方案',
                showPlanPopupPicker: false,
                showPicker1: false,
                selectedPlan: {
                    name: '',
                    value: '',
                    planNo:'',
                    planDetail: [],
                    id:'',
                },
                premium: [],
//                premiumType: 'A',
                planPrice: {
                    name: '',
                    value: ''
                },
                planDetails: [
                    {
                        planTitle: "防癌险",
                        desc: "",
                        planItems: [
                            {
                                title: "癌症确诊费用保险金",
                                value: '200万',
                            },
                            {
                                title: "癌症治疗费用保险金",
                                value: '200万',
                            },
                            {
                                title: "免赔额",
                                value: '0元',
                            },
                            {
                                title: "生效日",
                                value: '投保成功后次日零时',
                            },
                        ]
                    },

                ],
                plans: [
                    [
                        {
                            name: "0-6周岁",
                            minAge:0,
                            maxAge:6,
                            value: 1,
                            id: 1,
                            price: {
                                name: '250.00',
                                value: 250
                            },
                            planNo:'anxin_publiab_1',
                        },
                        {
                            name: "7周岁-20周岁",
                            minAge:7,
                            maxAge:20,
                            value: 2,
                            id: 2,
                            price: {
                                name: '50.00',
                                value: 50
                            },
                            planNo:'anxin_publiab_2',
                        },
                        {
                            name: "21周岁-25周岁",
                            value: 3,
                            id: 3,
                            minAge:21,
                            maxAge:25,
                            price: {
                                name: '99.00',
                                value: 99
                            },
                            planNo:'anxin_publiab_3',
                        },
                        {
                            name: "26周岁-30周岁",
                            value: 4,
                            id: 4,
                            minAge:26,
                            maxAge:30,
                            price: {
                                name: '125.00',
                                value: 125
                            },
                            planNo:'anxin_publiab_4',
                        },
                        {
                            name: "31周岁-35周岁",
                            value: 5,
                            id: 5,
                            minAge:31,
                            maxAge:35,
                            price: {
                                name: '165.00',
                                value: 165
                            },
                            planNo:'anxin_publiab_5',
                        },
                        {
                            name: "36周岁-40周岁",
                            value: 6,
                            id: 6,
                            minAge:36,
                            maxAge:40,
                            price: {
                                name: '205.00',
                                value: 205
                            },
                            planNo:'anxin_publiab_6',
                        },
                        {
                            name: "41周岁-45周岁",
                            value: 7,
                            id: 7,
                            minAge:41,
                            maxAge:45,
                            price: {
                                name: '244.00',
                                value: 244
                            },
                            planNo:'anxin_publiab_7',
                        },
                        {
                            name: "46周岁-50周岁",
                            value: 8,
                            id: 8,
                            minAge:46,
                            maxAge:50,
                            price: {
                                name: '333.00',
                                value: 333
                            },
                            planNo:'anxin_publiab_8',
                        },
                        {
                            name: "51周岁-55周岁",
                            value: 9,
                            id: 9,
                            minAge:51,
                            maxAge:55,
                            price: {
                                name: '410.00',
                                value: 410
                            },
                            planNo:'anxin_publiab_9',
                        },
                        {
                            name: "56周岁-60周岁",
                            value: 10,
                            id: 10,
                            minAge:56,
                            maxAge:60,
                            price: {
                                name: '471.00',
                                value: 471
                            },
                            planNo:'anxin_publiab_10',
                        },
                        {
                            name: "61周岁-65周岁",
                            value: 11,
                            id: 11,
                            minAge:61,
                            maxAge:65,
                            price: {
                                name: '617.00',
                                value: 617
                            },
                            planNo:'anxin_publiab_11',
                        },
                        {
                            name: "66周岁-70周岁",
                            value: 12,
                            id: 12,
                            minAge:66,
                            maxAge:70,
                            price: {
                                name: '911.00',
                                value: 911
                            },
                            planNo:'anxin_publiab_12',
                        },

                    ]
                ],
                /*planpicker相关的数据 end*/
                tabIndex: 2,//0是基础版 1白银 2白金
                showContent01: false,
                showContent02: false,
                desc1: '',
                desc2: '',
                startDate:'',
                endDate:'',
            }
        },
        components: {
            PopupPicker, Group, Cell, Loading, XHeader, Flexbox, FlexboxItem, Radio,CheckIcon,
//            AlertModule, Alert,
            Grid, GridItem,
            Divider, Card,
            Popup,  XButton,
            Checker, CheckerItem,
            Tab,
            TabItem,
            XDialog,
            Datetime,
//            PopupRadio,
            PopupHeader
        },
        methods: {

            log (str1, str2 = '') {
                console.log(str1, str2)
            },
            onConfirmDate(val){
                this.refreshShowPlan()
                this.refreshShowPrice()
                return ;
            },
            alertNo(){
//                this.ischecked=false;
               alert('对不起，您的状况不符合本产品要求，不能进行投保')
            },
            confirmOk(){
//                if(this.ischecked==true){
                    let applyurl = '/insure?planNo='+encodeURIComponent(this.selectedPlan.planNo)+'&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name)+'&id='+encodeURIComponent(this.selectedPlan.id);
                    this.$router.push({path:applyurl})
//                }
            },
            onConfirmPlan: function () {
                this.isShow=true;
            },
            onChange(val) {
                //选择的方案已改变，需要刷新，重新根据选择的方案确定要显示的数据
                this.refreshShowPlan()
                this.refreshShowPrice()
            },
            //计算总价
            computeTotalPrice(){
                let curPlan = this.getSelectPlan();
                console.log("curPlan ="+ curPlan);
                if(curPlan==null){
                    return 0;
                }
                //初始总价0
                let totalPrice=0;
                //①累加【方案】级别的价格
                if(curPlan.price){
                    totalPrice+=parseFloat(curPlan.price.name)
                }
                return totalPrice;
            },
            /**
             * 刷新显示的总价
             */
            refreshShowPrice(){
                let price=this.computeTotalPrice();
                this.planPrice={name:price,value:""}
            },
            /**
             * 填充空的默认值
             */
            fillDefaultValue(){
                this.premium = [];
                this.planPrice = {name: "", value: ""};
                this.selectedPlan = {
                    name: '',
                    value: '',
                    planNo:'',
                    planDetail: []
                };
            },
            /**
             * 根据选择的方案，刷新显示的内容
             */
            refreshShowPlan(){
                this.fillDefaultValue()
                let curPlan=this.getSelectPlan()
                if(!curPlan){
                    return;
                }
                this.selectedPlan=curPlan
            },
            /**
             * 返回用户当前选中的方案
             */
            getSelectPlan(){
                return this.getSelectPlan2();
            },
            /**
             * 根据出生日期 计算年龄，根据年龄自动选择方案
             */
            getSelectPlan2(){
                var age=this.tool.getAgeByDate(this.defaultDate);//方法应该返回方案对象 不是索引数字
                var list=this.plans[0]
                //循环方案list 查找符合年龄的方案的value
                for(var index in list){
                    var data=list[index]
                    if(age>=data.minAge&&age<=data.maxAge){
                        return this.getPlanByValue(data.value);
                    }
                }  //for
                return null;//代码运行至此，说明用户的年龄 没有合适的方案（list中的都不符合年龄范围）
            },
            getPlanByValue(value){
                let curPlan=this.plans[0].filter((plan) => {
                    //filter查找对应当前所选value的plan
                    return plan.value.toString() == value.toString();
                })[0];
                return curPlan;
            },
            backTop(){
                document.body.scrollTop = 0;
            },
            initCurDate() {
                var todayStr=this.formatDate()
                return todayStr;
            },
            // 日期格式和
            formatDate(date,fmt) {
                if(date==undefined||date==null){
                    date=new Date();
                }
                if(fmt==undefined||fmt==null){
                    fmt="yyyy-MM-dd";
                }
            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt;
        },
            /**
             * 传入date和数字offsetYear（如-70），返回date1向前70年的日期
             * @param date1
             * @param offsetYear
             */
            getDateOffsetYear(date1, offsetYear) {
                //date1的年份加上offsetYear 得到date2
                var date2=new Date(date1.getFullYear()+offsetYear,date1.getMonth(),date1.getDate());
                return date2;
            },
            /**
             * 传入date和数字days（如-3），返回date加上-3天后的日期
             */
            plusDay(date, days) {
                //date的日期加上days天 得到date2返回
                if(date==null){
                    date=new Date()
                }
                var timestamp=date.getTime()
                timestamp=timestamp+days*(1000*3600*24)
                var date2=new Date(timestamp);
                return date2;
            },
            initPreDate(){
                var today=new Date();
                var beforeData=this.plusDay(today,-26)//测试
                //70年前
                var date2=this.getDateOffsetYear(today,-70)//测试
                this.endDate=this.formatDate(date2);
                this.startDate=this.formatDate(beforeData);
                console.log("endDate="+this.endDate)
                console.log("startDate="+this.startDate)
            },
    },
        created() {},
        mounted() {
//            this.startDate=this.initCurDate(); //初始化当前日
            this.initPreDate(); //初始化
//            this.$refs.planpicker.currentValue=[this.plans[0][0].value];
            this.refreshShowPlan();
            this.refreshShowPrice();

            this.desc1='<p style=" text-indent:2em;font-size: 12px;text-align: justify">在保险期间内，若被保险人在等待期后经医院的专科医生确诊初次患有癌症，对于癌症确诊之日前30日内（含确诊日期当日）在医院治疗时发生的与确诊癌症相关的合理且必需的住院或相关门急诊医疗费用，保险公司在扣除被保险人按照社会基本医疗保险、公费医疗或其他途径（包含保险公司在内的其他医疗费用补偿型产品等）取得的医疗费用补偿后，对剩余金额按照给付比例给付癌症确诊费用保险金。（被保险人已从社会基本医疗保险、公费医疗或商业保险机构费用补偿型产品获得费用补偿后按照100%比例给付；被保险人未从社会基本医疗保险、公费医疗或商业保险机构费用补偿型产品获得费用补偿后按照50%比例给付，与“癌症治疗费用保险金”共用保额）</p>';
            this.desc2='<p style=" text-indent:2em;font-size: 12px;text-align: justify">在保险期间内，若被保险人在等待期后经医院的专科医生确诊初次患有癌症，对于癌症确诊之日后在医院治疗时发生的与治疗癌症相关的合理且必需的住院或相关门急诊医疗费用，保险公司在扣除被保险人按照社会基本医疗保险、公费医疗或其他途径（包含保险公司在内的其他医疗费用补偿型产品等）取得的医疗费用补偿后，对剩余金额按照给付比例给付癌症治疗费用保险金。（被保险人已从社会基本医疗保险（含新型农村合作医疗）、公费医疗或商业保险机构费用补偿型产品获得费用补偿后按照100%比例给付；被保险人未从社会基本医疗保险（含新型农村合作医疗）、公费医疗或商业保险机构费用补偿型产品获得费用补偿后按照50%比例给付，与“癌症确诊费用保险金”共用保额）</p>';
        },
    }


</script>

<style lang="scss" >
    /* @function r( $px ){
         @return $px*750/$designWidth/20 + rem;
     }*/

    @function r($px) {
        @return $px /2/18.75 * 1rem;
    }
    $OperatorHeight: 3rem;
    $BaseFontSize: 0.95rem;
    $buttonFontSize: 0.95rem;
    $BaseLineHeight: 1.9rem;
    $BaseColor: #232323;
    $orangeColor: #FC9020;
    $halfBlackColor: #8c8c8c;
    .desc{font-size: $BaseFontSize;line-height: 20px;color: $halfBlackColor}
    .vux-checker-box{
        /*width: 90%;*/
        margin-left: 10px;
    }
    .demo1-item {
        border: 1px solid #ececec;
        padding: 5px 5px;
        margin-left: 5px;
        margin-bottom: 5px;
    }
    .demo1-item-selected {
        border: 1px solid  $orangeColor;
    }

    #anxin_detail {
        padding-bottom: $OperatorHeight;
        .ban_img {
            width: 100%;
        }
        .detail_img{width: 100%;}
        .planItem {
            $cell-value-color: #000;
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
        }
        .plan-picker-wrap {
            .vux-cell-primary {
                font-size: $BaseFontSize;
            }
      /*      .vux-cell-arrow-down {
                &:after {
                    border-color: $orangeColor;
                    color: $orangeColor;
                }
            }
            .vux-cell-arrow-up{
                &:after {
                    border-color: $orangeColor;
                    color: $orangeColor;
                }
            }*/
            .vux-label {
                font-size: $BaseFontSize;
                color:$BaseColor;
                line-height: $BaseLineHeight;
            }
        }
        .plan-detail-wrap {
            .vux-label-desc {
                font-size: $BaseFontSize;
            }
            .vux-label {
                font-size: $BaseFontSize;
                color:$BaseColor;
                line-height: $BaseLineHeight;
            }
            .vux-cell-primary {
                font-size: $BaseFontSize;
            }
            /*.vux-no-group-title{
                .weui-cell_access{
                    .weui-cell__ft {
                        &:after {
                            border-color: $orangeColor;
                            color: $orangeColor;
                        }
                    }
                }
            }*/
        }
    }
    .vux-cell-no-border-intent{&:before{
        left:15px;
    }}
    #anxin_detail .vux-label{
        font-size: $BaseFontSize;
        line-height: $BaseLineHeight;
    }
    #anxin_detail .vux-radio-label{
        font-size: $BaseFontSize;
        line-height: $BaseLineHeight;

    }
    #anxin_detail .weui-icon-circle{
        font-size: $buttonFontSize;
    }
    #anxin_detail .weui-icon-success{
        font-size:$buttonFontSize;
    }
    #anxin_detail{
        .vux-check-icon{
            span{
                color: $halfBlackColor;
                font-size: $BaseFontSize;
                line-height:$BaseLineHeight;
            }
        }
    }
    #anxin_detail #mianpei .vux-cell-primary{
        text-align: left;
        margin-left: 15px;
    }
    #anxin_detail .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
        color: $orangeColor;
    }
    #anxin_detail .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
        color: $orangeColor;
    }
    #anxin_detail{
        .weui-cells{
            margin-top: 40px;
            &:after{
                display: none;
            };
            &:before{
                display: none;
            }
        }
    }
    /*#anxin_detail */
    .flex-demo {
        text-align: left;
        color: #000;
        background-color: #fff;
        background-clip: padding-box;
        line-height: 53px;
        padding: 0 15px;
        font-weight: 600;
        font-size: $buttonFontSize;
    }

    #anxin_detail{
        .weui-cell:before{right:15px;left:15px;}
        .weui-cell__ft{
            font-size:$BaseFontSize;
            color:$halfBlackColor;
        }
        .select{
            .weui-cell__ft{
                font-size:$BaseFontSize;
                color:#68a6f5;
            }
        }
        .weui-grid__label{
            font-size:$BaseFontSize;
            color:$BaseColor;
        }
        .s-insurance {
            margin-right: 0.2rem;
            vertical-align: middle;
            display: inline-block;
        }
        .s-insurance::before{font-size: 15px;content: "\e6c6";}
        .vux-no-group-title{margin-top: 30px;}
        .weui-cells{margin-top: 40px;}
        .vux-popup-dialog{background: #fff}
        .subTitle{
            &:after{
                content: " ";
                position: absolute;
                left: 15px;
                right: 15px;
                bottom: 0;
                /*right: 0;*/
                height: 1px;
                border-bottom: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
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
        height: 40px;
        background: #ccc;
        text-align: center;
        z-index: 1000;
        -webkit-transition-duration: 300ms;
        transition-duration: 300ms;
    }
    /*#anxin_detail */
    .divstyle{
        font-size:0.7rem;text-align: left;padding: 5px 15px;line-height: 1.3rem;color: #666;
    }
    .pstyle{line-height:$BaseLineHeight;font-size: $BaseFontSize;color: #353535}
    .link{background: #eee;font-size:0.72rem; }
    .v-transfer-dom{
        .vux-popup-header-right{
            color:$orangeColor;
        }
        .vux-popup-dialog{
            background: #fff;
            .weui-cells{
                &:after{
                    display: none;
                };
                margin-top:40px
            }
            #Layer_1{position: absolute;right: 15px;top:5px;}

        }
    }
    .back-top{
        border: 1px solid #bfbfbf;
        border-radius:50% ;
        font-weight: 200;
        text-align:center;
        width: 2rem;
        height: 2rem;
        display: inline-block;
        position: fixed;
        right: 1rem;
        bottom: 4rem;
        background: #fff;
        z-index: 100;
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
    .question{color: $orangeColor;margin-top: 0.5rem;}
    #anxin_detail{
        .vux-tab-wrap{
            padding-top: 50px;
            .vux-tab-container{
                height: 50px;
                .scrollable{
                    padding-left: 15px;padding-right: 15px;
                    .vux-tab-item {
                        -webkit-box-flex: 0;
                        -ms-flex: 0 0 22%;
                        flex: 0 0 19%;
                        top: 6px;
                    }
                }
                .vux-tab {
                    background: linear-gradient(180deg,#fff,#f5f5f5);
                    .vux-tab-item{
                        margin-right: 5px;
                        background: linear-gradient(to bottom, #f3f3f3, #f6f6f6);
                        position: relative;
                        color: $BaseColor;
                    }
                    .vux-tab-selected {
                        color: $orangeColor;
                        border-bottom: none;
                        -webkit-box-shadow: 0 1rem 1rem rgba(160, 160, 160, 0.5);
                        box-shadow: 0 1rem 1rem rgba(160, 160, 160, 0.5);
                        background: #fff;
                        height: 50px;
                        top: 0;
                        line-height: 50px;
                        position: relative;
                        &:before{
                            position: absolute;content: '' ;border-top:3px solid #FC9020;top:0;left: 0;width: 100%;
                        }
                    }
                    .vux-tab-ink-bar{
                        background: #FC9020;
                    }
                }
            }
        }
        .selectPlan{
            .weui-cell__ft {
                color: $orangeColor;
                &:after {
                    border-color: $orangeColor;
                }
            }
        }
        .plan-detail-wrap{
            .weui-grids{margin: 10px 0;background: #fff;}
            .weui-grid{padding: 10px;}
        }
    }
    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }
.vux-datetime{
    div{
        p{font-size: $BaseFontSize;line-height: $BaseLineHeight}
    }
}
.dp-container {.dp-header{.dp-item.dp-right{color: $orangeColor;}}}
    #v-transfer{
        .vux-popup-dialog{overflow-y: hidden;}
        .pop-main{
            width: 100%;overflow-y: scroll;height: 78%;padding:10px 15px;box-sizing: border-box;
            .contain{
                font-size: 0.7rem;
                div{font-size: 0.9rem;line-height: 1.5rem;margin-bottom: 0.5rem;}
                p{
                    line-height: 1.3rem;
                    color: #959595;
                    /*text-indent:2em;*/
                }
            }
        }
        .pop-footer{
            /*display: flex;*/
            height: 44px;
            line-height: 44px;
            /*font-size: 0.8rem;*/
            background-color: #fbf9fe;
            position: absolute;
            bottom: 0;
            width: 100%;
            margin: auto;
            text-align: center;
            .pop-footer-btn{
                width: 60px;
                /* padding: 0 10px; */
                font-size: 0.8rem;
                background: $orangeColor;
                border-radius: 5px;
                color: #ffffff;
                display: inline-block;
                height: 30px;
                line-height: 30px;
            }
            .no{margin-right: 0.5rem;width: 60px;}
        }
    }
</style>
