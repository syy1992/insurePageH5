<template>
    <div id="detail">
        <img src="../../../static/images/xiaobao_banner.jpg" class="ban_img">
        <group :gutter=0>
            <!--<div class="plan-picker-wrap">-->
                <!--&lt;!&ndash;<cell :title='title1' ></cell>&ndash;&gt;-->
                <!--&lt;!&ndash;<cell primary="content" title="选择保障方案" :value="selectedPlan.name" :is-link=true @click.native="showPlanPopupPicker = true" :arrow-direction='"down"' class='select'>&ndash;&gt;-->
                    <!--&lt;!&ndash;<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">&ndash;&gt;-->
                <!--&lt;!&ndash;</cell>&ndash;&gt;-->
                <!--<cell primary="content" title="选择保障方案" :value="selectedPlan.name" >-->
                    <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">-->
                    <!--<checker radio-required type='radio' v-model="checkList"   default-item-class="demo1-item" selected-item-class="demo1-item-selected"  ref="planpicker" @on-change="onChange" >-->
                        <!--<checker-item :value="item.value" v-for="(item, index) in plans[0]"  :key="item.value">{{item.name}}</checker-item>-->
                   <!--</checker>-->
                <!--</cell>-->
               <!---->

                <!--&lt;!&ndash;<popup-picker :show.sync="showPlanPopupPicker" :title="pickertitle" :show-cell="false" :data="plans" ref="planpicker" @on-change="onChange" ></popup-picker>&ndash;&gt;-->
            <!--</div>-->
            <cell :title='"选择方案"' :value="selectedPlan.name"  class='selectPlan'>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
            </cell>
            <tab :animate='false'   v-model.number="tabIndex" >
                  <tab-item v-for="(item, index) in plans[0]" :key="item.value" :selected="item.value===1" :value="item.value" @on-item-click="onChange">{{item.name}}</tab-item>
            </tab>
        </group>
        <div class="plan-picker-wrap">
            <group v-for="(planDetail,index) in selectedPlan.planDetails"  :gutter=0 :key='index'>
                <cell :title='"责任险保障"'
                      :border-intent="false"
                      :arrow-direction="showContent01 ? 'up' : 'down'"
                      @click.native="showContent01 = !showContent01" value='查看详情' class='small-text'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>

                <cell v-for="(planItem,index) in planDetail.planItems" :title="planItem.title" :value="planItem.value" class="planItem" :key='index'></cell>
                <cell v-if="showContent01" v-html='desc1' class='desc'></cell>
            </group>
        </div>

        <div class="plan-detail-wrap">
            <div class="back-top" @click="backTop">
                <i class="iconfont">&#xe7e5;</i>
            </div>
            <group  v-for="(item,index) in planDetails2"   :gutter=10 :key='index'>
                <cell :title='"附加险保障"' :border-intent="false"
                      :arrow-direction="showContent02 ? 'up' : 'down'"
                      @click.native="showContent02 = !showContent02" value='查看详情' class='small-text'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
                <cell>
                    <check-icon :value.sync="ischeck" slot="icon" >{{item.desc}}</check-icon>
                </cell>
                <cell primary="content" v-for="(planItem,index) in item.planItems" :title="planItem.title" :value="planItem.value" :key='index' class="planItem"></cell>
                <cell v-if="showContent02" v-html='desc2' class='desc'></cell>
            </group>
            <group v-if="premium.length>0" :gutter=10>
                <cell :title='"营业面积"' class='subTitle'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
                <radio :options="premium" v-model="premiumType" @on-change="premiumchange" ref="radioPremiu"></radio>
                <!--<radio fill-mode fill-label="Other" fill-placeholder="other" :options="radio003" @on-change="change"></radio>-->
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
                <img src="../../../static/images/xiaobao_detail.jpg" class='detail_img'>
            </group>

            <grid :show-lr-borders="false" :show-vertical-dividers="false">
                <grid-item @click.native="show1 =true">
                <img slot="icon" src="../../../static/images/icon1.png">
                <span slot="label">投保须知</span>
                </grid-item>
                <grid-item @click.native="show2 =true">
                    <img slot="icon" src="../../../static/images/icon2.png">
                    <span slot="label">理赔服务</span>
                </grid-item>
                <grid-item @click.native="show3 =true">
                    <img slot="icon" src="../../../static/images/icon3.png">
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
            <popup v-model="show1" position="bottom" max-height="50%">
                <div class='close' @click="show1 = false" >
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
            <popup v-model="show2" position="bottom" height="50%" >
                <div class='close' @click="show2 = false" >
                    <x-icon type="ios-close-empty" size="30"></x-icon>
                </div>
                <group>
                    <div class='divstyle'>
                        <p  class='pstyle'>理赔服务</p>
                        <p>【理赔流程】</p>
                        <p> 1、出险后尽快拨打021-95518进行报案</p>
                        <p> 2、客户根据指示提交理赔材料</p>
                        <p> 3、保险公司将审核案件并将属于保险公司保险责任的理赔款直接转账至被保险人/受益人名下的指定银行卡账户</p>
                        <p>【理赔须知】</p>
                        <p> 1、出险理赔时，若被保险人无法提供需要的相关营业执照、经营许可证等证件，或实际营业场所面积大于被保险人所填报的营业场所面积，保险公司有权进行比例赔付。</p>
                        <p> 2、报案后，应尽快提供理赔材料，并保持通讯畅通。若超过60天未提供理赔材料或号码无法联系，将视为放弃索赔。</p>
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
                        <p class='question' style='margin-top: 0'>1、教培机构责任险保障责任是什么？</p>
                        <p>在本保险有效期限内，被保险人（教培机构）在保单列明的经营场所内依法从事教学活动以及由于意外事故造成学生的下列损失或费用，依法应由被保险人（教培机构）承担的民事赔偿责任，保险公司负责赔偿。赔偿责任范围：</p>
                        <p>（1）学生的人身伤亡或财产损失；</p>
                        <p>（2）事先经保险人书面同意的诉讼费用；</p>
                        <p>（3）发生保险责任事故后，被保险人为缩小或减少对学生人身伤亡或财产损失的赔偿责任所支付的必要的、合理的费用。</p>
                        <p> 保障责任范围：</p>
                        <p>（1）在教学活动期间，学生在保单列明的经营场所内发生人身伤亡事故；</p>
                        <p>（2）学生在保单列明的经营场所内参加由被保险人统一组织或安排的活动或比赛过程中的人身伤亡事故；</p>

                        <p class='question'> 2、意外事故指什么？</p>
                        <p>意外事故 是指不可预料的以及被保险人无法控制并造成物质损失或人身伤亡的突发性事件。</p>

                        <p class='question'> 3、 教培机构责任险附加险保障责任是什么？</p>
                        <p>本产品附加险采用《中国人民财产保险股份有限公司公众责任险附加 食品、饮料责任条款》，保障因教培机构（被保险人）提供的食品、饮料或掺有异物的食品、饮料造成学生人身伤亡或财产损失时教培机构（被保险人）应负的赔偿责任。</p>

                        <p class='question'>4、投保成功后，如何获取保单和发票?</p>
                        <p>本合同提供电子单证，您可于人保财险官网（www.epicc.com.cn）下载电子保单和发票。如需纸质保单或发票，请拨打客服热线：021-95518。</p>

                        <p class='question'>5、免赔额是什么？</p>
                        <p>绝对免赔额是指在保险公司不赔偿的金额，损失金额扣除免赔额之外的损失，保险公司才会进行赔偿。本产品免赔额是：在保险合同约定赔偿责任范围内，学生人身伤亡没有免赔，学生的财产损失免赔额100元或者财产损失总额的10%，以高者为准。</p>

                        <p class='question'> 6、 什么是每人每次限额，每次赔偿限额，累计赔偿限额？</p>
                        <p>每人每次限额：保险公司对教培机构每次事故每人人身伤亡或财产损失的最高赔偿金额。</p>
                        <p>每次赔偿限额：保险公司对教培机构每次事故的最高赔偿金额。</p>
                        <p>累计赔偿限额：保险公司对教培机构每年累计赔偿的最高金额。</p>

                        <p class='question'> 7、每次事故指什么？</p>
                        <p>每次事故指一次意外事故或者同一突发性事件引起的一系列意外事故。因同一意外事故造成多人人身伤亡或财产损失，导致多人同时或先后向被保险人索赔的，视为一次事故。</p>

                        <p class='question'> 8、被保险人或其代表、雇佣人员人身伤亡的赔偿责任，以及上述人员所有的或由其保管或控制的财产的损失，保险公司赔不赔？</p>
                        <p>本保险产品不赔偿机构自身及其雇员的人身伤亡和财产损失。</p>

                        <p class='question'> 9、在机构内，发生诸如学生打架受伤，学生发生烧伤，外部人员侵入等导致学生人身伤亡或财产损失，保险公司赔不赔，赔多少？</p>
                        <p>发生这种意外事故，保险公司根据事故原因，是否保障责任以及机构责任占比来决定赔偿结果。</p>

                        <p class='question'> 10、 若一个学校有多个校区，如何投保？</p>
                        <p> 本保险产品是按照地址承保，所以各个校区需分别投保。</p>

                    </div>
                </group>
            </popup>
        </div>
        <div v-transfer-dom id='ewm'>
            <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
                <div class="img-box">
                    <div class='d_desc'>产品咨询请联系客服安安</div>
                    <img src="../../../static/images/ewm.png" style="max-width:100%">
                    <div class='d_title'>长按识别二维码</div>
                </div>
            </x-dialog>
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
        Divider, Card,
        Popup,  XButton,
        Checker, CheckerItem,
        Tab,
        TabItem,
        XDialog,
        querystring,
        Confirm
    } from 'vux'

    export default {
        name: 'detail',
        directives: {
            TransferDom
        },
        data() {
            return {
                showTip:false,
                planDetails2: [
                    {
                        planTitle: "附加险",
                        desc: '食品、饮料安全责任保险',
                        planItems: [
                            {
                                title: "每人每次限额",
                                value: '2000元',
                            },
                            {
                                title: "累计赔偿限额",
                                value: '10万',
                            },
                        ],
                        price: 50
                    }
                ],
                textVal: '财产损失100元或损失金额10%，以高者为准；人伤无免赔',
                period: '一年',
//                title1:'教培机构责任险',
                val: 1,
//                checkList: null,
                ischeck: false,
                show1: false,
                show2: false,
                show3: false,
                showHideOnBlur:false,
                clause: ['中国人民财产保险股份有限公司公众责任保险条款', '中国人民财产保险股份有限公司公众责任险附加险条款'],
                /*title相关*/
                title: "保障权益",
                /*planpicker相关的数据 start*/
                showPlanPopupPicker: false,
                showPicker1: false,
                pickertitle: '保障方案',
                selectedPlan: {
                    name: '',
                    value: '',
                    planNo:'',
                    planDetail: []
                },
                premium: [],
                premiumType: 'A',
                planPrice: {
                    name: '',
                    value: ''
                },
                plans: [
                    [
                        {
                            name: "基础版",
                            value: 1,
//                        price: {
//                            name: '500.00',
//                            value: 500
//                        },
                            planNo:'JHPICCPUBL0001',
                            premium: [
                                {
                                    key: 'A',
                                    value: 'A 营业面积≦500平',
                                    price: {
                                        name: '500.00',
                                        value: 500
                                    }
                                }, {
                                    key: 'B',
                                    value: 'B 营业面积>500平',
                                    price: {
                                        name: '550.00',
                                        value: 550
                                    }
                                }
                            ],

                            planDetails: [
                                {
                                    planTitle: "公众责任保险",
                                    desc: "学员在教学活动期间，以及在被保险人负有管理责任的校舍、场地、其他教育教学设施、生活设施、交通工具内发生人身损害事故的责任",
                                    planItems: [
                                        {
                                            title: "每人每次限额",
                                            value: '5万',
                                        },
                                        {
                                            title: "每次赔偿限额",
                                            value: '10万',
                                        },
                                        {
                                            title: "累计赔偿限额",
                                            value: '20万',
                                        },
                                    ]
                                },

                            ]
                        },

                        {
                            name: "白银版",
                            value: 2,
                            planNo:'JHPICCPUBL0002',
                            premium: [
                                {
                                    key: 'A',
                                    value: 'A 营业面积≦500平',
                                    price: {
                                        name: '750.00', //显示750元
                                        value: 750
                                    }
                                }, {
                                    key: 'B',
                                    value: 'B 营业面积>500平',
                                    price: {
                                        name: '825.00 ',
                                        value: 825
                                    }
                                }
                            ],
                            planDetails: [{
                                planTitle: "公众责任保险",
                                desc: "学员在教学活动期间，以及在被保险人负有管理责任的校舍、场地、其他教育教学设施、生活设施、交通工具内发生人身损害事故的责任",
                                planItems: [
                                    {
                                        title: "每人每次限额",
                                        value: '10万',
                                    },
                                    {
                                        title: "每次赔偿限额",
                                        value: '25万',
                                    },
                                    {
                                        title: "累计赔偿限额",
                                        value: '50万',
                                    },
                                ]
                            },
                            ]
                        },
                        {
                            name: "白金版",
                            value: 3,
                            planNo:'JHPICCPUBL0003',
                            premium: [
                                {
                                    key: 'A',
                                    value: 'A 营业面积≦500平',
                                    price: {
                                        name: '980.00',
                                        value: 980
                                    }
                                }, {
                                    key: 'B',
                                    value: 'B 营业面积>500平',
                                    price: {
                                        name: '1078.00 ',
                                        value: 1078
                                    }
                                }
                            ],
                            planDetails: [{
                                planTitle: "公众责任保险",
                                desc: "学员在教学活动期间，以及在被保险人负有管理责任的校舍、场地、其他教育教学设施、生活设施、交通工具内发生人身损害事故的责任",
                                planItems: [
                                    {
                                        title: "每人每次限额",
                                        value: '20万',
                                    },
                                    {
                                        title: "每次赔偿限额",
                                        value: '50万',
                                    },
                                    {
                                        title: "累计赔偿限额",
                                        value: '100万',
                                    },
                                ]
                            },
                            ]
                        },
                        {
                            name: "钻石版",
                            value: 4,
                            planNo:'JHPICCPUBL0004',
                            premium: [
                                {
                                    key: 'A',
                                    value: 'A 营业面积≦500平',
                                    price: {
                                        name: '1950.00',
                                        value: 1950
                                    }
                                }, {
                                    key: 'B',
                                    value: 'B 营业面积>500平',
                                    price: {
                                        name: '2145.00 ',
                                        value: 2145
                                    }
                                }
                            ],
                            planDetails: [
                                {
                                    planTitle: "公众责任保险",
                                    desc: "学员在教学活动期间，以及在被保险人负有管理责任的校舍、场地、其他教育教学设施、生活设施、交通工具内发生人身损害事故的责任",
                                    planItems: [

                                        {
                                            title: "每人每次限额",
                                            value: '30万',
                                        },
                                        {
                                            title: "每次赔偿限额",
                                            value: '100万',
                                        },
                                        {
                                            title: "累计赔偿限额",
                                            value: '200万',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            name: "尊享版",
                            value: 5,
                            planNo:'JHPICCPUBL0005',
                            premium: [
                                {
                                    key: 'A',
                                    value: 'A 营业面积≦500平',
                                    price: {
                                        name: '3800.00',
                                        value: 3800
                                    }
                                }, {
                                    key: 'B',
                                    value: 'B 营业面积>500平',
                                    price: {
                                        name: '4180.00 ',
                                        value: 4180
                                    }
                                }
                            ],
                            planDetails: [{
                                planTitle: "公众责任保险",
                                desc: "学员在教学活动期间，以及在被保险人负有管理责任的校舍、场地、其他教育教学设施、生活设施、交通工具内发生人身损害事故的责任",
                                planItems: [
                                    {
                                        title: "每人每次限额",
                                        value: '50万',
                                    },
                                    {
                                        title: "每次赔偿限额",
                                        value: '200万',
                                    },
                                    {
                                        title: "累计赔偿限额",
                                        value: '400万',
                                    },
                                ]
                            },
                            ],

                        },

                    ]
                ],
                /*planpicker相关的数据 end*/
                tabIndex: 2,//0是基础版 1白银 2白金
                showContent01: false,
                showContent02: false,
                desc1: '',
                desc2: '',
//                floorAreaNum:1,
                additionRisk:0,
//                area500plus:false
                salesNo:decodeURIComponent(querystring.parse(location.search.substr(1)).salesNo||''),//业务员,
            }
        },
        components: {
            PopupPicker, Group, Cell, Loading, XHeader, Flexbox, FlexboxItem, Radio,CheckIcon,
            Grid, GridItem,
            Divider, Card,
            Popup,  XButton,
            Checker, CheckerItem,
            Tab,
            TabItem,
            XDialog,
            Confirm
        },
        methods: {
            onConfirmPlan: function () {
//                this.showTip=true;
//                 return;
                console.log('this.premiumType',this.premiumType);
                if(this.premiumType=='A'){
                    this.area500plus=0
                }else{
                    this.area500plus=1
                };
                if(this.ischeck==false){
                    this.additionRisk=0
                }else{
                    this.additionRisk=1
                };
                console.log('this.ischeck='+this.ischeck)
                let applyurl = '/page/xiaobao_insure?planNo='+encodeURIComponent(this.selectedPlan.planNo)+'&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name)+'&area500plus='+encodeURIComponent(this.area500plus)+'&additionRisk='+encodeURIComponent(this.additionRisk)+'&salesNo='+encodeURIComponent(this.salesNo);
                window.open(applyurl,'_self');
            },
            //选择的方案变更
            onChange(val) {
                //选择的方案已改变，需要刷新，重新根据选择的方案确定要显示的数据
                console.log('this.checkList='+this.checkList)
                this.refreshShowPlan()
                this.refreshShowPrice()
            },
            /**
             *  营业面积 选中项改变
             **/
            premiumchange(value, label) {
                this.refreshShowPrice();
            },
            /**
             * 计算总价
             */
            computeTotalPrice(){
                let curPlan = this.getSelectPlan();
                if(curPlan==null){
                    return 0;
                }
                //初始总价0
                let totalPrice=0;

                //①累加【方案】级别的价格
                if(curPlan.price){
                    totalPrice+=parseFloat(curPlan.price.name)
                }

                //②累加营业面积对应的价格。有【营业面积】选项且有选中项，则查找选中项 累加其price
                var radior = this.$refs.radioPremiu;
                if(this.premium&&radior&&radior.currentValue.length>0){
                    let curRadiorValue=radior.currentValue[0];
                    //查找和curRadiorValue对应的选项，即为选中项
                    let curRadior=this.premium.filter((p) => {
                        return p.key == curRadiorValue;
                    })[0];
                    totalPrice+=parseFloat(curRadior.price.name);
                }
                //③累加附加险价格。如果勾选了附加险，则累加其价格
                if(this.ischeck&&this.planDetails2.length>0){
                    //如果以后附加险内有多个可勾选的，这里要改进
                    totalPrice+=parseFloat(this.planDetails2[0].price)
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
                this.premiumType = '';
                this.planPrice = {name: "", value: ""};
                this.selectedPlan = {
                    name: '',
                    value: '',
                    planDetail: []
                };
            },
            /**
             * 根据选择的方案，刷新显示的内容（主要为刷新营业面积选择<select>）
             */
            refreshShowPlan(){
                this.fillDefaultValue()
                let curPlan=this.getSelectPlan()
                if(!curPlan){
                    return;
                }
                this.selectedPlan=curPlan
                if(!!curPlan.premium){
                    //如果当前方案有premium 营业面积选项，则展示
                    this.premium=curPlan.premium;
                    this.$nextTick(function () {
                        //dom刷新后，将选项设为第一个，作为默认选项
                        var radior = this.$refs.radioPremiu;
                        if (radior&& this.premium.length>0) {
                            radior.currentValue = this.premium[0].key;
                        }
                    });
                }else{
                    this.premium=[]
                }

            },
            /**
             * 返回用户当前选中的方案
             */
            getSelectPlan(){
                let curPlanValue= parseInt(this.tabIndex+1);
                let curPlan=this.plans[0].filter((plan) => {
                    //filter查找对应当前所选value的plan
                    return plan.value.toString() == curPlanValue;
                })[0];
                return curPlan;
            },
            backTop(){
                this.showHideOnBlur=true;
            },
        },
        created() {},
        mounted() {
            //初始选中第一个方案，即this.plans[0]下第0个元素
//            this.$refs.planpicker.currentValue=[this.plans[0][0].value];
            this.checkList=1;
            this.$nextTick(() => {
                this.tabIndex =2
            });
            this.refreshShowPlan();
            this.refreshShowPrice();
            this.desc1='<div style=" text-indent:2em;font-size: 12px;">在本保险有效期限内，被保险人在本保险单明细表中列明的地点范围内依法从事生产、 经营等活动以及由于意外事故造成下列损失或费用，依法应由被保险人承担的民事赔偿责任，保险人负责赔偿:<br/>' +
                '<p  style=" text-indent:2em">(一)第三者人身伤亡或财产损失;</p>' +
                '<p  style=" text-indent:2em">(二)事先经保险人书面同意的诉讼费用;</p>' +
                '<p  style=" text-indent:2em">(三)发生保险责任事故后，被保险人为缩小或减少对第三者人身伤亡或财产损失的赔偿责任 所支付的必要的、合理的费用。</p></div>';
            this.desc2='<p style=" text-indent:2em;font-size: 12px;">本保险扩展承保本保险单明细表中列明的地点范围内，因其提供的食品、饮料或掺有异物的食品、饮料造成第三者人身伤亡或财产损失时被保险人应负的赔偿责任。</p>'
        },
        watch:{
            //附加险 勾选框选中状态变化后调用
            "ischeck":function (newValue) {
                this.refreshShowPrice()
            }
        }
    }
</script>
<style lang="scss" >
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

    .vux-checker-box {
        margin-left: 10px;
    }
    .demo1-item {
        border: 1px solid #ececec;
        padding: 5px 5px;
        margin-left: 5px;
        margin-bottom: 5px;
    }

    .demo1-item-selected {
        border: 1px solid $orangeColor;
    }

    #detail {
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
            .vux-cell-arrow-down {
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
            }
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
           .vux-no-group-title{
               .weui-cell_access{
                   .weui-cell__ft {
                       &:after {
                           border-color: $orangeColor;
                           color: $orangeColor;
                       }
                   }
               }
           }
        }
    }

    #detail .vux-label{
        font-size: $BaseFontSize;
        line-height: $BaseLineHeight;
    }
    #detail .vux-radio-label{
        font-size: $BaseFontSize;
        line-height: $BaseLineHeight;

    }
    #detail .weui-icon-circle{
        font-size: $buttonFontSize;
    }
    #detail .weui-icon-success{
        font-size:$buttonFontSize;
    }
    #detail{
        .vux-check-icon{
            span{
                color: $halfBlackColor;
                font-size: $BaseFontSize;
                line-height:$BaseLineHeight;
            }
        }
    }
    #detail #mianpei .vux-cell-primary{
        text-align: left;
        margin-left: 15px;
    }
    #detail .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
        color: $orangeColor;
    }
    #detail .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
        color: $orangeColor;
    }
    #detail{
        .weui-cells{margin-top: 30px;}
    }
    /*#detail */
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

    #detail{
        .weui-cell:before{right:15px;}
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
        .weui-cells{margin-top: 30px;}
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
        height: 30px;
        background: #ccc;
        text-align: center;
        z-index: 1000;
        -webkit-transition-duration: 300ms;
        transition-duration: 300ms;
    }
    /*#detail */
    .divstyle{
        font-size:0.7rem;text-align: left;padding: 5px 15px;line-height: 1.3rem;color: #666;
    }
    .pstyle{line-height:$BaseLineHeight;font-size: $BaseFontSize;color: #353535}
    .link{background: #eee;font-size:0.72rem; }
    .weui-cells:after{display: none;}
    .v-transfer-dom{
        .vux-popup-header-right{
            color:#68a6f5;
        }
        .vux-popup-dialog{
            background: #fff;
            .weui-cells{margin-top:30px}
            #Layer_1{position: absolute;right: 15px;}

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
        background: #62b900;
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
        .iconfont{font-size: 20px;color: #ffffff;margin-top: 5px;display: block;}
    }

    .question{color: $orangeColor;margin-top: 0.5rem;}

    #detail{
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
      .plan-detail-wrap{
          .weui-grids{margin: 10px 0;background: #fff;}
          .weui-grid{padding: 10px;}
      }
        .small-text{
            .vux-cell-arrow-transition{font-size: 0.8rem;color: $orangeColor}
            .vux-cell-arrow-down{&:after{right: 0;margin-top: -6px;}}
        }
  }
    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }
#ewm{
    .dialog-demo {
        .weui-dialog{
            border-radius: 8px;
            width: 60%;
        }
        .dialog-title {
            line-height: 30px;
            color: #666;
        }
        .dialog-desc {
            line-height: 30px;
            color: #666;
        }
        .img-box {
            width: 100%;
            overflow: hidden;
            img{
                width: 140px;
                height: 140px;
            }
            .d_title{text-align: center;font-size: 0.8rem;padding: 10px 0}
            .d_desc{text-align: center;font-size: 0.8rem;padding: 10px 0}
        }
        .vux-close {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }
    .weui-dialog{
        width: 60%;
    }
}

</style>
