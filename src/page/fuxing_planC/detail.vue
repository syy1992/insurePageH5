<template>
    <div id="detail">
        <img src="../../../static/images/fuxingplanc_banner.jpg" class="ban_img">
        <group :gutter=0 :title='planTitle' class='plan-choice'>
            <ul  class='main'>
                <li>
                    <span class='title'>被保人年龄:</span>
                    <div class="chooseItems"><span class="chooseItem notEffect" style="">30天-50周岁</span></div>
                </li>
                <li>
                    <span class="title">出生日期:</span> <div class="birthday" >
                    <datetime format="YYYY-MM-DD"  v-model='defaultDate'   :start-date="insuredEndDate"  :end-date="insuredStartDate" @on-confirm='changeDateOrTerm' ></datetime>
                </div>
                </li>
                <li><span class="title">性别:</span>
                    <div class="chooseItems">
                        <span  @click='clicksex(index)' :class="{'chooseItem':true,'active':index ==sexNum}" :value=item.key v-for='(item,index) in sexList' :key='index'>{{item.value}}</span>
                    </div>
                </li>
                <li>
                    <span class="title">保障额度:</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                        <select class="plan-choose" v-model="planIndex" @change='changeDateOrTerm' >
                        <!--<select class="plan-choose" v-model="planIndex" @change='ajaxDataQuery' >-->
                            <option :value=item.key v-for='(item,index) in amountList' :key='index'>{{item.value}}</option>
                            <!--<option :value=item.key v-for='(item,index) in amountList.slice(0,(x<y?x:y)+1)' :key='index'>{{item.value}}</option>-->
                        </select>
                        <i class="s-xiayiye iconfont">&#xe6b9;</i>
                    </div>
                    </div>
                </li>
                <!--<li><span class="title">附加轻症疾病</span>-->
                    <!--<div class="chooseItems">-->
                        <!--<span  @click='clickIsInsure(index)' :class="{'chooseItem':true,'active':index ==isInsure}" :value=item.key v-for='(item,index) in list' :key='index' >{{item.value}}</span>-->
                    <!--</div>-->
                <!--</li>-->
          <!--      <li><span class="title">附加轻症疾病</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='isInsure' >
                                <option :value=item.key v-for='(item,index) in list' :key='index'>{{item.value}}</option>
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                    </div>
                </li>-->
                <li>
                    <span class="title">缴费年期:</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='payTermIndex' @change='changeDateOrTerm' >
                                <option :value=item.key v-for='(item,index) in payTermList' :key='index'>{{item.value}}</option>
                                <!--<option :value=item.key v-for='(item,index) in payTermList.slice(0,jiaofeinianxianLimit+1)' :key='index'>{{item.value}}</option>-->
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                    </div>
                </li>
                <li><span class="title">保障期间:</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='insureYear' @change='ajaxDataQuery' >
                                <option :value=item.key v-for='(item,index) in insureYearsList' :key='index'>{{item.value}}</option>
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                    </div>

                </li>
                <li>
                    <span class="title">职业类别:</span>
                    <div class="chooseItems choosse1">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='professionNum' @change='changeDateOrTerm'>
                            <!--<select class="plan-choose" v-model='professionNum' @change='changeProfessionNum'>-->
                                <option :value=item.key v-for='(item,index) in professionNumList' :key='index'>{{item.value}}</option>
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                        <span  @click='showProfession=true' style='right: -2.5rem;position: absolute;top: 0.3rem;font-size: 0.9rem;padding-left: 0.7rem;'><em>查询</em></span>
                    </div>
                    <!--<span class="chooseItem notEffect" @click='showProfession=true'><em style=" color: #FC9020;">查询</em></span>-->
                    <!--<span class="chooseItem notEffect" @click='showProfession=true'><em style=" color: #FC9020;">查询</em></span>-->
                </li>

                <li>
                    <span class="title">被保人与投保人关系</span>
                    <div class="chooseItems">
                        <span  @click='clickIsInsure2(index)' :class="{'chooseItem':true,'active':index ==relation}" :value=item.key v-for='(item,index) in relationList' :key='index'>{{item.value}}</span>
                    </div>
                </li>
                <li>
                    <span class="title">附加投保人豁免保费</span>
                    <div class="chooseItems ">
                        <div class="chooseDiv">
                            <!--<select class="plan-choose" v-model='isInsure2'  @change='changeHuomian'>-->
                            <select class="plan-choose" v-model='isInsure2'  @change='ajaxDataQuery'>
                                <option :value=item.key v-for='(item,index) in list' :key='index'>{{item.value}}</option>
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                    </div>
                </li>
                <!--<li>-->
                    <!--<span class="title">附加投保人豁免保费</span>-->
                    <!--<div class="chooseItems">-->
                        <!--<span  @click='clickIsInsure2(index)' :class="{'chooseItem':true,'active':index ==isInsure2}" :value=item.key v-for='(item,index) in list' :key='index'>{{item.value}}</span>-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li v-if='isInsure2==1'>-->
                    <!--<span class="title">投保人出生日期:</span> <div class="birthday" ><datetime format="YYYY-MM-DD"  v-model='defaultDate1'   :start-date="applicantEndDate"  :end-date="applicantStartDate" @on-confirm='ajaxDataQuery'></datetime></div>-->
                <!--</li>-->
                <!--<li v-if='isInsure2==1'><span class="title">投保人性别:</span> <div class="chooseItems">-->
                    <!--<span  @click='clicksex2(index)' :class="{'chooseItem':true,'active':index ==sexNum2}" :value=item.key v-for='(item,index) in sexList' :key='index'>{{item.value}}</span>-->
                <!--</div>-->
                <!--</li>-->

                <li v-if='relation==1'>
                    <span class="title">投保人出生日期:</span> <div class="birthday" ><datetime format="YYYY-MM-DD"  v-model='defaultDate1'   :start-date="applicantEndDate"  :end-date="applicantStartDate" @on-confirm='ajaxDataQuery'></datetime></div>
                </li>
                <li v-if='relation==1'><span class="title">投保人性别:</span> <div class="chooseItems">
                    <span  @click='clicksex2(index)' :class="{'chooseItem':true,'active':index ==sexNum2}" :value=item.key v-for='(item,index) in sexList' :key='index'>{{item.value}}</span>
                </div>
                </li>
            </ul>

        </group>
        <div class="plan-picker-wrap">

            <group  :gutter=10 >
                <cell :title='"保障权益/保额"' value="" >
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
                </cell>

                <template >
                    <cell :title='detailDocList[0].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[0].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[0].show = !detailDocList[0].show" :value='plans[planIndex].docPrice[0]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[0].show" v-html='detailDocList[0].desc' class='desc'></cell>
                </template>
                <template >
                    <cell :title='detailDocList[1].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[1].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[1].show = !detailDocList[1].show" :value='plans[planIndex].docPrice[1]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[1].show" v-html='detailDocList[1].desc' class='desc'></cell>
                </template>
                <template v-if="isInsure==1">
                    <cell :title='detailDocList[2].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[2].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[2].show = !detailDocList[2].show" :value='plans[planIndex].docPrice[2]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[2].show" v-html='detailDocList[2].desc' class='desc'></cell>

             <!--       <cell :title='detailDocList[3].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[3].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[3].show = !detailDocList[3].show" :value='plans[planIndex].docPrice[3]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[3].show" v-html='detailDocList[3].desc' class='desc'></cell>-->
                </template>
                <template v-if="isInsure==1&&isInsure2==1">
                  <!--  <cell :title='detailDocList[2].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[2].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[2].show = !detailDocList[2].show" :value='plans[planIndex].docPrice[2]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[2].show" v-html='detailDocList[2].desc' class='desc'></cell>-->

                    <cell :title='detailDocList[3].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[3].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[3].show = !detailDocList[3].show" :value='plans[planIndex].docPrice[3]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[3].show" v-html='detailDocList[3].desc' class='desc'></cell>
                </template>

                <!--<template v-if="isInsure2==1">-->
                    <!--<cell :title='detailDocList[4].title'-->
                          <!--:border-intent="false"-->
                          <!--:arrow-direction="detailDocList[4].show ? 'up' : 'down'" is-link-->
                          <!--@click.native="detailDocList[4].show = !detailDocList[4].show" :value='plans[planIndex].docPrice[4]'-->
                          <!--class='small-text planItem'>-->
                    <!--</cell>-->
                    <!--<cell v-if="detailDocList[4].show" v-html='detailDocList[4].desc' class='desc'></cell>-->
                <!--</template>-->


               <!-- <template v-if="relation==1">
                    <cell :title='detailDocList[4].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[4].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[4].show = !detailDocList[4].show" :value='plans[planIndex].docPrice[4]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[4].show" v-html='detailDocList[4].desc' class='desc'></cell>
                </template>-->

            </group>

        </div>

        <div class="plan-detail-wrap">
            <div class="back-top" @click="this.tool.backTop">
                <img src="../../../static/images/top.png">
            </div>

            <group  :gutter=10 >
                <cell primary="content"  title="产品介绍">
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
                </cell>
                <img src="../../../static/images/fuxingplanc_detail.jpg" class='detail_img'>
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
                    <!--<x-icon type="ios-help-outline" size="30"   ></x-icon>-->
                    <span slot="label">常见问题</span>
                </grid-item>

            </grid>
            <!--<popup-picker :show.sync="showPicker1"  :data="plans"  ref="picker" :show-cell="false"></popup-picker>-->
            <flexbox :gutter="0" class="oprations">
                <flexbox-item :span="2/5" :order="1" >
                    <div class="plan-price">￥ {{price | formatMoney}}</div>
                </flexbox-item>
                <flexbox-item  :order="2"><div class="plan-tel"><a href='tel:4006117777' class='tel'><i class="iconfont">&#xe642;</i>咨询</a></div></flexbox-item>
                <flexbox-item :order="3">
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
            <popup v-model="show2" position="bottom" height="50%" >
                <div class='close' @click="show2 = false" >
                    <x-icon type="ios-close-empty" size="30"></x-icon>
                </div>
                <group>
                    <div class='divstyle'>
                        <p><strong>理赔服务</strong></p>
                        <p>本计划由复星联合健康保险股份有限公司承保，您可以通过复星联合健康保险7x24小时客服电话4006-11-7777进行报案理赔</p>
                        <p><br></p>
                        <p><strong>理赔流程：</strong></p>
                        <p><strong>一、理赔咨询</strong></p>
                        <p>理赔咨询请拨打4006-11-7777</p>
                        <p><strong>二、理赔资料</strong></p>
                        <p>1.身故、意外及重疾理赔申请书；</p>
                        <p>2.认可医疗机构出具的被保险人诊断证明、门急诊病历、出院小结、住院病历（加盖医院病历专用章）、手术记录、病理报告；</p>
                        <p>3.受益人有效身份证件；</p>
                        <p>4.银行卡复印件。</p>
                        <p><strong>三、提交申请材料</strong></p>
                        <p>1.将理赔资料邮寄至我公司指定的联系地址：上海市虹口区海伦路440号金融街海伦中心1901室——复星联合健康保险作业中心，邮编200086；</p>
                        <p>2.方便时亲临我公司营业网点柜面，现场提交理赔资料。</p>
                        <p><strong>四、理赔审核</strong></p>
                        <p>对于资料齐全、责任明确无需调查的案件，我们将在最多30日内审核完毕。</p>
                        <p><strong>五、支付保险金</strong></p>
                        <p>我们将在结案或达成给付协议后3个工作日内支付保险金至您指指定账户。</p>
                        <p><br></p>
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
                        <p class='question' style='margin-top: 0'>Q:什么是等待期？</p>
                        <p>A:为什么设立等待期?指合同在生效的指定时期内，即使发生保险事故，受益人也不能获得保险赔偿，这段时期称为等待期。等待期是为了防止投保人隐瞒高风险因素，而投保以获得保险金的行为。本产品疾病类保障有180天的等待期。</p>
                        <p class='question' >Q:保单如何回访？</p>
                        <p>A:按监管规定，保险公司会在您购买保单后的犹豫期之内对您进行回访，回访电话显示为021-80317777，请您留意接听。</p>
                        <p class='question'>Q:本产品是否有犹豫期？</p>
                        <p>A:本产品为长期产品，有犹豫期，自投保人签收本合同的次日零时起，有15日的犹豫期。</p>
                        <p class='question'>Q:什么是投保人豁免保险费？</p>
                        <p>A:投保人豁免保险费是指投保人首次发生条款中约定的重大疾病、轻症疾病、身故、失能四种情况，则自确认后的下个交费日开始投保人名下被豁免保险凭证载明应交的保险费都免除，同时本附加合同终止</p>
                        <p class='question'>Q:本产品对医院有要求吗？</p>
                        <p>A:本产品认可的医院指中国境内拥有合法经营执照当地基本医疗保险管理机构最新公布的二级以上(含二级)的医保定点医院。</p>
                        <p class='question'>Q:本产品可以保哪些疾病?保障哪些费用?</p>
                        <p>A:本产品为重大疾病保险，保障范围包含80种重疾疾病，35种轻症疾病，详细疾病定义可以参考保险条款。本产品为重大疾病保险，不需事后报销，只需被保险人出险后按照合同所述理赔流程提供材料后即可获得一笔现金补偿，可用于任何开支。</p>
                        <p class='question'>Q:什么是原位癌？本产品保原位癌吗？</p>
                        <p>A:原位癌指恶性肿瘤细胞末穿透基底膜的原位无浸润恶性肿瘤，属癌症的最早期，故又称为“0期癌”。一般情况下，积极治疗可以治愈。本产品轻症疾病责任中包含原位癌这一病种，故可以对原位癌有较好的保障。</p>
                        <p class='question'>Q:什么是轻症疾病豁免保险费？</p>
                       <p>A:轻症疾病豁免保险费是指如果被保险人首次发生轻症疾病，则自确诊后下个交费日开始保单后续未交的保险费都免除，且保单持续有效。本产品包含轻症疾病豁免保险费责任。</p>
                        <p class='question'>Q:轻症保险金可以累计赔付吗？</p>
                        <p>A:本产品每种轻症疾病限给付一次，给付后该种轻症疾病保险金保险责任终止。不同轻症疾病可以多次给付，但本产品的轻症疾病保险金累计给付以三次为限当累计给付的轻症疾病保险金达到三次时，轻症疾病保险金保险责任终止，若被保险人因同一原因导致发生两种或两种以上的轻症疾病，保险公司仅按一种轻症疾病给付轻症疾病保险金。</p>
                        <p><br></p>
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
        <div v-transfer-dom id='v-transfer'>
            <popup v-model="isShow" height='70%'>
                <popup-header  title="健康告知" :show-bottom-border="false" @on-click-right="isShow = false"> </popup-header>
                <i class="iconfont ios-close" @click='isShow = false' >&#xe647;</i>
                <!--<x-icon type="ios-close-empty" size="30" @click.native='isShow = false'></x-icon>-->
                <div class='pop-main'>
                    <div class="contain">
                        <div>健康告知</div>
                        <p>请提供“是”或“否”的答案，若被保险人为未成年人，则请被保险人的父母代为回答;</p>
                        <p>如申请投保人豁免保费附加险，须对投保人健康状况进行告知</p>
                        <p>投保人应在对所有被保险人健康和职业状况充分了解的基础上履行如实告知义务。如被保险人健康和职业状况与下述告知内容不符：</p>
                        <p>（1）本公司有权不同意承保或解除合同</p>
                        <p>（2）如发生保险事故，本公司不承担赔偿或给付保险金的责任，对于故意不如实告知的，不退还保险费</p>
                        <p>1、您最近2年内是否因健康异常发生过住院或手术，或由体检医师或医生给您提出住院或手术的建议？此处所述住院治疗或手术不包含咽喉炎、鼻炎、扁桃体炎、肺炎、上呼吸道感染、阑尾炎、脂肪瘤、骨折、颈椎疾病、急性胃炎或非萎缩性胃炎、顺产手术、胆囊炎、剖腹产。</p>
                        <p>2、您是否抽烟大于400支年（支年=每日吸烟支数*烟龄）？</p>
                        <p>3、过去2年中，您是否在3个月内因不明原因导致的体重增加或减少超过5公斤？</p>
                        <p>4、您是否在投保或复效时被拒保、延期、加费或除外责任承保？ 或最近1年累计投保重疾险产品保额超过100万？</p>
                        <p>5、您是否参与任何危险的运动或赛事（如赛车、海拔3000米以上登山、攀岩、滑雪、潜水、跳伞、蹦极、驾驶航空机具以及其它危险运动或赛事）？</p>
                        <p>6、您是否曾经或正在使用镇静安眠药、迷幻剂、毒品或其他违禁药物，是否有麻醉剂成瘾、酒精或药物滥用成瘾？</p>
                        <p>7、您是否患有或曾患有下列疾病或症状，或因下列疾病而接受检查或治疗？</p>
                        <p>（1）先天性疾病、癫痫、身体或智力残疾、双耳失聪、双眼失明或高度近视1000度以上；</p>
                        <p>（2）心脑血管疾病（高血压、冠心病、主动脉狭窄、肺动脉高压、脑血管瘤或畸形、脑中风、心肌梗塞）； </p>
                        <p>（3）呼吸系统疾病（慢性支气管炎、肺结节疾病、胸膜粘连、哮喘、肺结核、肺栓塞、肺纤维化、慢性阻塞性肺病、终末期肺病、呼吸功能衰竭）； </p>
                        <p>（4）内分泌或免疫系统疾病（糖尿病、甲状腺功能亢进症、甲状腺功能减退症、原发性醛固酮增多症、嗜铬细胞瘤、系统性红斑狼疮、肌营养不良、强直性脊柱炎、风湿或类风湿关节炎）； </p>
                        <p>（5）消化系统疾病（肝炎病毒感染或携带、肝硬化、重症肝炎、胰腺炎、萎缩性胃炎、胃或十二指肠溃疡、溃疡性结肠炎、克隆氏病）； </p>
                        <p>（6）泌尿系统疾病（急性肾炎、慢性肾炎、肾病综合症、肾功能不全、肾功能衰竭、肾动脉狭窄、多囊肾）； </p>
                        <p>（7）血液系统或淋巴系统疾病（贫血、再生障碍性贫血、白血病、血友病、骨髓增生异常综合症、何杰金氏病、非何杰金氏淋巴瘤）； </p>
                        <p>（8）精神或神经系统疾病（抑郁症、焦虑症、精神分裂症、酒精或药物滥用、癫痫、帕金森氏症、阿尔兹海默病、重症肌无力、多发性硬化）； </p>
                        <p>（9）癌症或任何肿瘤、HIV病毒携带或感染、艾滋病；未明确为良性的息肉、囊肿、结节（如甲状腺结节）、肿块、赘生物。</p>
                        <p> 8、您是否：</p>
                        <p>（1）从事如下涉及或接触危险物职业：矿工、航海、海上救护、潜水、水下作业人员、爆破工、采掘工、隧道坑道或井下作业机械加工业搬运工、电讯电台及电力部门天线设施的制造、安装、维修人员、硫酸盐酸或硝酸等有毒化工品制造人员、森林砍伐人员、火药爆竹制造及加工、液化气体制造、高压电工程作业人员、高空作业人员、战地记者、高空杂技、特技、武打演员、动物园驯兽师；</p>
                        <p>（2）现役军、警人员：防暴警察及负有特殊任务者、地面部队人员、水兵、空军飞行员、前线军人、特种兵（伞兵、海军陆战队、化学兵、布雷爆破任务兵）；</p>
                        <p>（3）曲棍球、橄榄球球员、滑雪教练、滑雪运动员。</p>
                        <p> 9、您的父母是否有人患过以下疾病？ 卵巢癌或乳腺癌（仅对女性被保险人）、大肠癌、心肌梗塞、冠心病、脑中风、糖尿病、多发性硬化症、帕金森氏病、多囊肾性疾病。</p>
                        <p>10、15周岁以上女性告知 ：</p>
                        <p>(1)您是否为高龄孕妇（35周岁以上）或怀孕28周以上或存在妊娠并发症？ </p>
                        <p>(2)您是否曾/正患有以下症状或疾病？乳房肿块、阴道不规则流血、子宫肌瘤、子宫内膜异位症、卵巢囊肿、TCT或HPV阳性、重度宫颈炎？</p>
                        <p>11、婴幼儿告知（2周岁及以下告知） ：</p>
                        <p>(1)被保险人出生时体重是否小于2.5公斤？ </p>
                        <p>(2)是否有早产、抽搐、窒息、缺氧、畸形、发育迟缓、脑瘫、智能障碍、听力障碍、其他残障、反复气喘、遗传或先天性疾病？</p>

                        <p><br></p>
                        <p>以上问题请按照被保险人实际情况填写：如其中1项问题为“是”，请选择（不符合）；如以上所有问题均为“否”，请选择（符合）！</p>
                        <p><br></p>

                    </div>
                </div>
                <div class='pop-footer'>
                    <a class='pop-footer-btn no' @click='alertNo'>
                        <div>不符合<span style='font-size: 0.6rem'>(进入智能核保)</span></div>
                    </a><a class='pop-footer-btn ok' @click='confirmOk'>符合</a>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import professionData from '../../../static/js/getProfessionList.js'
    import {
        PopupPicker,
        Group,
        Cell,
        Loading,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem,CheckIcon,
        Grid, GridItem,
        Divider,
        Popup,  XButton,
        Checker, CheckerItem,
        XDialog,
        Confirm,
        Datetime,
        PopupHeader,
        md5,
        querystring,
    } from 'vux'
    import WepayInput from "../../../node_modules/vux/src/components/wepay-input/index";

    export default {
        name: 'detail',
        directives: {
            TransferDom
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{})
        },
        data() {
            let queryObj = querystring.parse(location.hash.split("?")[1]);
            return {
                picSrc:require('../../../static/images/icon.png'),
                price:'0.01',
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
                payTermList:[
                    {key:'5',value:'5年交'},
                    {key:'10',value:'10年交'},
                    {key:'15',value:'15年交'},
                    {key:'20',value:'20年交'},
                    {key:'30',value:'30年交'},
                ],
                professionNumList:[
                    {key:0,value:'1类'},
                    {key:1,value:'2类'},
                    {key:2,value:'3类'},
                    {key:3,value:'4类'},
                    {key:4,value:'5类'},
                    {key:5,value:'6类'},
                ],
                insureYearsList:[
                    {key:'70',value:'至70周岁'},
                    {key:'80',value:'至80周岁'},
                    {key:'105',value:'至终身'},
                ],
                insureYear:'80',
                showTip: false,
                sexNum:'1',
                sexNum2:'0',
                sexList:[
                    {key:'0',value:'女',},
                    {key:'1',value:'男',},
                ],
                isInsure:'1',
                isInsure2:'0',
                relation:'0',
                relationList:[
                    {key:'0',value:'本人',},
                    {key:'1',value:'非本人',},
                ],
                list:[
                    {key:'0',value:'不投保',},
//                    {key:'1',value:'投保',},
                ],
                detailDocList: [
                    {
                        title: "重大疾病保险金（80种）",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外，或本合同生效（若曾复效，则自本合同最后复效）之日起 180 天后因非意外的原因在本公司指定或认可的医疗机构5由专科医生确诊初次发生本合同所列的一种或多种重大疾病，本公司按本合同基本保险金额给付重大疾病保险金，同时本合同终止。被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起 180 天内因非意外的原因在本公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种重大疾病，本公司将按投保人已交纳本合同累计保险费数额（不计息）给付重大疾病保险金，同时本合同终止。</p></div>'
                    },
                    {
                        title: "轻症疾病保险金（35种）",
                        show: false,
                        desc: '<div><p>被保险人因意外，或在本合同生效（若曾复效，则自本合同最后复效）之日起180 天后因非意外的原因在本公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病8，本公司按本合同基本保险金额的 30%给付轻症疾病保险金。被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起 180 天内因非意外的原因在本公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，本公司将按投保人已交纳的本合同累计保险费数额（不计息）给付轻症疾病保险金，同时本合同终止。</p><p>每种轻症疾病限给付一次，给付后该种轻症疾病保险责任终止。不同轻症疾病可以多次给付，但本合同的轻症疾病保险金累积给付以三次为限。当累积给付的轻症疾病保险金达到三次时，轻症疾病保险责任终止。</p><p>如果被保险人因同一原因导致其罹患本合同所定义的两种或两种以上的轻症疾病，本公司仅按一种轻症疾病给付轻症疾病保险金。</p></div>'
                    },
                    {
                        title: "轻症疾病豁免保费",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外，或在本合同生效（若曾复效，则自本合同最后复效）之日起 180 天后因非意外的原因在本公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，则自确诊日后首个本合同的保险费约定交纳日开始，直至本合同最后一次保险费约定交纳日止，本公司豁免前述期间内本合同应交纳的保险费。本公司视豁免的保险费为已交纳的保险费，本合同继续有效。被保险人在本合同生效（若曾复效，则自本附加合同最后复效）之日起 180 天内因非意外的原因在本公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，本公司不承担轻症疾病豁免保险费责任，同时本合同终止。</p></div>'
                    },
                    {
                        title: "投保人身故、重疾、轻症及失能豁免",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外首次发病，或本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因身故、或经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，或者首次发生一种或多种重大疾病、轻症疾病，本公司豁免相应豁免保险费期间内该被人名下被豁免保险凭证载明的应交保险费，本公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。</p></div>'
                    },
                ],
//                checkList: null,
                ischeck: false,
                show1: false,
                show2: false,
                show3: false,
                isShow:false,
                showProfession: false,
                clause: ['复星联合康乐一生重大疾病保险（C款升级款）条款', '复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款',],
                /*title相关*/
                title: "保障权益",
                /*planpicker相关的数据 start*/
                showPlanPopupPicker: false,
                showPicker1: false,
                pickertitle: '保障方案',
                selectedPlan: {
                    name: '',
                    value: '',
                    planNo: '',
                    planDetail: []
                },
                premium: [],
//                premiumType: 'A',
                planPrice: {
                    name: '',
                    value: ''
                },
                planIndex: 3,//
                payTermIndex: '20',
                professionNum: 0,
                plans: [
                    {
                        value: 1,
                        docPrice: ['5万', '1.50万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 2,
                        docPrice: ['10万', '3万', '豁免保费', '豁免保费'],
                    },
                    {
                        value: 3,
                        docPrice: ['15万', '4.50万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 4,
                        docPrice: ['20万', '6万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 5,
                        docPrice: ['25万', '7.50万', '豁免保费', '豁免保费'],
                    },
                    {
                        value: 6,
                        docPrice: ['30万', '9万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 7,
                        docPrice: ['35万', '10.50万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 8,
                        docPrice: ['40万', '12万', '豁免保费', '豁免保费'],
                    },
                    {
                        value: 9,
                        docPrice: ['45万', '13.50万', '豁免保费',  '豁免保费'],
                    },
                    {
                        value: 10,
                        docPrice: ['50万', '15万', '豁免保费', '豁免保费'],
                    },
                ],
                /*planpicker相关的数据 end*/
                additionRisk: 0,
                professionList:[],
                showProfessionList:[],
                isSelLeaf:false,  //当前选择的是否是叶子节点（用户是否已完成选择）
                selProfessionIndex:[],
                selProfessionDes:[],
                selProfessionDesPath:"",
                professionValidDes:"",
                professionVal:0,
                defaultDate:'',
                defaultDate1:'',
                insuredStartDate:'',
                insuredEndDate:'',
                applicantEndDate:'',
                applicantStartDate:'',
                submitData:null,
                planTitle:'康乐一生C款重疾保险（不含身故）',
                maxAmountNum:0,
                maxProfessionNum:0,
                maxPaymentYearNum:0,
            };
        },
        components: {
            WepayInput,
            PopupPicker, Group, Cell, Loading, Flexbox, FlexboxItem,CheckIcon,
            Grid, GridItem,
            Divider,
            Popup,  XButton,
            Checker, CheckerItem,
            XDialog,
            Confirm,
            Datetime,
            PopupHeader,
            querystring,
            md5,
        },
        methods: {
            alertNo(){
//                alert('您的健康状况，不符合投保要求')
                this.underwrite()
            },
            underwrite(){
                let url=process.env.BASE_URL+process.env.commonPort+'/insurance/fosunklc/healthNotice';
                let privateKey = process.env.fuxingPrivateKey;
                let params={
                    "account":process.env.fuxingAccount,
                    "data":JSON.stringify({"planNo":"JHFUHIKLCA0001","urlParam":"?price="+encodeURIComponent(this.price)+'&insureYear='+encodeURIComponent(this.insureYear)+'&planIndex='+encodeURIComponent(this.planIndex)+'&payTermIndex='+encodeURIComponent(this.payTermIndex)}),
                    "reqTid":new Date().getTime(),
                };
                params.sign=md5("account" + params.account + "data" + params.data + "reqTid" + params.reqTid + privateKey).toString().toUpperCase();
                this.$http.post(url,params).then(({data}) => {
                    console.log(data);
                    switch(data.resCode){
                        case '0000'://成功
                            let requestUrl=data.data.requestUrl;
                            let requestParams={
                                'ebiz_sign':data.data.ebizSign,
                                'request_xml':data.data.requestXml
                            };
                           this.formPost(requestUrl,requestParams)
                            break;
                        case '1001'://账号不存在或被禁用
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1002'://
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1003'://必填写项为空
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1004'://验签失败
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '9999'://系统异常
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        default:
                        //
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
                console.log('val='+newElement.value)

            },
            clicksex(index){  this.sexNum =index;
            this.ajaxDataQuery();
            },
            clicksex2(index){
                this.sexNum2 =index;
                this.ajaxDataQuery();
                },
            clickIsInsure(index){
                this.isInsure =index;
//                this.ajaxDataQuery();
                },
            clickIsInsure2(index){
//                this.isInsure2 =index;
                this.relation =index;
                this.changeHuomian()
                this.ajaxDataQuery();
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
                        this.professionVal=node.val;
                        str+=node.val;
                        if(node.val>=1&&node.val<=6){
                            str+=" （符合投保条件）";
                            document.getElementsByClassName('pass')[0].className='pass'
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
            initPreDate(){
                var today=new Date();
                var beforeDate=this.tool.plusDay(today,-29)
                //70年前
                var beforeDay= this.tool.dateAddDay (today,1);
                var date2=this.tool.getDateOffsetYear(beforeDay,-51);//beforeDay
                this.insuredEndDate=this.tool.formatDate(date2);
                this.insuredStartDate=this.tool.formatDate(beforeDate);
                console.log("insuredEndDate="+this.insuredEndDate)
                console.log("insuredStartDate="+this.insuredStartDate)
            },
            initPreDate1(){
                var today=new Date();
                //70年前
                var beforeDay= this.tool.dateAddDay (today,1);
                var beforeDay2= this.tool.dateAddDay (today,-1);
                var date=this.tool.getDateOffsetYear(beforeDay,-50);//beforeDay
                var date2=this.tool.getDateOffsetYear(beforeDay2,-18);//beforeDay
                this.applicantEndDate=this.tool.formatDate(date);
                this.applicantStartDate=this.tool.formatDate(date2);
                console.log("applicantEndDate="+this.applicantEndDate)
                console.log("applicantStartDate="+this.applicantStartDate)
            },
            initCurDate() {
                var today=new Date();
                var todayStr=this.tool.formatDate(today)
//                this.defaultDate=todayStr;
                return todayStr;
            },
            onConfirmPlan() {
                if(this.changeDateOrTerm()==false){
                    //在这里进行跳转拦截
//                    console.log('aaaaaa='+this.changeDateOrTerm())
//                    this.showToast('请检查投保规则')
                    return ;
                }else{
                    this.isShow=true;
                }

            },
            confirmOk(){
                let applyurl = "/insure?price="+encodeURIComponent(this.price)+'&insureYear='+encodeURIComponent(this.insureYear)+'&planIndex='+encodeURIComponent(this.planIndex)+'&payTermIndex='+encodeURIComponent(this.payTermIndex);
                this.$router.push({path:applyurl})
            },
            premiumCalculation(){
                let account = process.env.fuxingAccount;
                let privateKey = process.env.fuxingPrivateKey;
                let reqTid = new Date().getTime();
//                if(this.relation==1){
//                    this.sexNum=this.sexNum
//                }else{
//                    this.sexNum==this.sexNum2
//                }
                var countData = {
                    "account": account,
                    "reqTid": reqTid, //JHKJtest0001
//                    sign: sign,
                    data: JSON.stringify({
                        "planNo": "JHFUHIKLCA0001",
                        "insuredSex": this.sexNum, //被保人
                        "applicantSex": this.sexNum2, //投保人
                        "applicantAge": this.tool.getAgeByDate(this.defaultDate1),//投保人年龄
                        "insuredAge":this.tool.getAgeByDate(this.defaultDate),//被保人年龄
                        "appInsSame":this.relation, //投保人是否为被保险人 0不是1是
                        "payYears": this.payTermIndex,  //缴费期
                        "amount": this.amountList[this.planIndex].val, //保额
                        "insureYears": this.insureYear, //保障期间
                        "ifAddHuoMian":this.isInsure2
                    })
                };
                countData.sign=md5("account" + account + "data" + countData.data + "reqTid" + reqTid + privateKey).toString().toUpperCase();
                this.submitData=countData
            },
            //发查询请求
            ajaxDataQuery(){
                this.changeHuomian()
                this.premiumCalculation();
                //fixme====投保接口
                let url=process.env.BASE_URL+process.env.commonPort+'/insurance/fosunklc/premiumTrial';
                this.$http.post(url,this.submitData).then(({data}) => {
                    console.log(data);
                    switch(data.resCode){
                        case '0000'://成功
                            this.isFetching = false;
                            this.price=data.data.totalPremium;
                            break;
                        case '1001'://账号不存在或被禁用
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1002'://
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1003'://必填写项为空
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '1004'://验签失败
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        case '9999'://系统异常
                            this.isFetching = false;
                            this.showToast(data.resMsg)
                            break;
                        default:
                        //
                    }
                });
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
             * 根据年龄获取缴费年期范围限制（保额范围是从list截取的一部分range [left, right]，该函数返回right值。left固定=0）
             **/
            getJiaofeinianqiRangeMaxByAge(age){
                if(age>=40){
                    return 3
                }else{
                    return 4
                }
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
            //选择日期或者缴费年期
            changeDateOrTerm(){
                let age= parseInt(this.tool.getAgeByDate(this.defaultDate));

                this.maxAmountNum=this.getBaoeRangeMaxByAge(age);//可选保额最大范围的最大值
                this.maxPaymentYearNum=this.getJiaofeinianqiRangeMaxByAge(age);//可选缴费年限最大范围的最大值
                this.maxProfessionNum=this.getBaoeRangeMaxByProfession(this.professionNum);//可选职业类别最大范围的最大值
//                console.log('保障额度maxAmountNum='+this.maxAmountNum)
//                console.log('职业类别maxProfessionNum='+this.maxProfessionNum)
//                console.log('保费年限jiaofeinianxianLimit='+this.maxPaymentYearNum)

                if(this.planIndex>this.maxAmountNum){
                    this.showToast('被保人年龄'+age+ '岁，保障额度上限最多为'+this.amountList[this.maxAmountNum].value+'请重新选择');
                    return false;
                }
                if(age>=40){
                    if(this.payTermIndex=="30"){
                        this.showToast(age+'岁缴费年期上限最大为'+this.payTermList[this.maxPaymentYearNum].value+',请重新选择');
                        return false;
                    }
                }

                if (this.professionNum> this.maxProfessionNum) {
                    if(parseInt(this.planIndex)>3) {
                        this.showToast('职业类别5-6类保障额度上限为' + this.amountList[this.maxProfessionNum].value);
                        return false;
                    }
                }


//                if(age>=40){
//                    this.payTermList=this.payTermList.slice(0,4);
//                    if(oldKey=="30"){
//                        //原选中项已经无效，需要把下拉控件的选中项设为一个默认值
//                        this.payTermIndex="20"
//                    }
//                }else{
//                    this.payTermList.push({key:'30',value:'30年交'})
//                }

//                //保障额度planIndex
//               let oldKey1=this.professionNum;
//               var copyAmountList=  JSON.parse(JSON.stringify(this.amountList))
//               var copyProfessionNumList=  JSON.parse(JSON.stringify(this.professionNumList))
//                if(this.planIndex>3){
//
//                    this.professionNumList=copyProfessionNumList.slice(0,4)
//                    if(oldKey1==5||oldKey1==6){
//                        this.amountList= copyAmountList.slice(0,4)
//                    }
//                    else {
//                        this.amountList= this.amountList
//                    }
//                }else{
//                    if(oldKey1==5||oldKey1==6){
//                        this.amountList= copyAmountList.slice(0,4)
//                    }
//                    else {
//                        this.amountList= this.amountList
//                    }
//                    this.professionNumList=[
//                        {key:'1',value:'1类'},
//                        {key:'2',value:'2类'},
//                        {key:'3',value:'3类'},
//                        {key:'4',value:'4类'},
//                        {key:'5',value:'5类'},
//                        {key:'6',value:'6类'},
//                    ];
//                }

                this.ajaxDataQuery()
            },
            changeHuomian(){
                if(this.relation==0){
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
            showToast(text){
                this.$vux.toast.show({
                    text: text,
                    type:'text',
                    width:'10em',
                    time:'3000'
                });
            },
        },
        created() {
        },
        mounted() {
            this.initCurDate();
            this.initPreDate();//被保人
            this.initPreDate1();//投保人
            this.getProfessionList();
            this.$nextTick(function () {
                this.defaultDate1= this.applicantStartDate
                this.defaultDate= this.applicantStartDate
                this.ajaxDataQuery()
//                this.changeDateOrTerm()
            });
        },
        watch: {},
        filters:{
            formatMoney(value) {
                return Number(value).toFixed(2)
            }
        }
    }

</script>
<style lang="scss" >
    @import "../../assets/css/fuxingDetail.scss";
    $orangeColor: #FC9020;
  .dp-container{
      .dp-header {
          .dp-item.dp-right{
              color: $orangeColor;
          }
      }
  }
    #detail{
        .main li .choosse1 {
            top: 0.6rem;
            right: 2.5rem;
        }
    }
    .weui-toast__content{font-size: 0.8rem;padding:0 0.5rem;}
</style>


