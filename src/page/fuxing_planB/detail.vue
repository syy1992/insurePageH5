<template>
    <div id="detail">
        <img src="../../../static/images/kangle_banner.jpg" class="ban_img">
        <group :gutter=0 title='康乐一生重疾保险' class='plan-choice'>
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
                        <select class="plan-choose" v-model="planIndex" @change='ajaxDataQuery' >
                            <option :value=item.key v-for='(item,index) in amountList' :key='index'>{{item.value}}</option>
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
                <li><span class="title">附加轻症疾病</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='isInsure' >
                                <option :value=item.key v-for='(item,index) in list' :key='index'>{{item.value}}</option>
                            </select>
                            <i class="s-xiayiye iconfont">&#xe6b9;</i>
                        </div>
                    </div>
                </li>
                <li>
                    <span class="title">缴费年期:</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='payTermIndex' @change='changeDateOrTerm' >
                                <option :value=item.key v-for='(item,index) in payTermList' :key='index'>{{item.value}}</option>
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
                    <div class="chooseItems"><span class="chooseItem notEffect" @click='showProfession=true'><em>1-4类</em> <em style=" color: #FC9020;">查询</em></span></div>
                </li>

                <li>
                    <span class="title">被保人与投保人关系</span>
                    <div class="chooseItems">
                        <span  @click='clickIsInsure2(index)' :class="{'chooseItem':true,'active':index ==relation}" :value=item.key v-for='(item,index) in relationList' :key='index'>{{item.value}}</span>
                    </div>
                </li>
                <li v-if='relation==1'>
                    <span class="title">附加投保人豁免保费</span>
                    <div class="chooseItems choosse">
                        <div class="chooseDiv">
                            <select class="plan-choose" v-model='isInsure2'  >
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


                <template v-if="relation==1">
                    <cell :title='detailDocList[4].title'
                          :border-intent="false"
                          :arrow-direction="detailDocList[4].show ? 'up' : 'down'" is-link
                          @click.native="detailDocList[4].show = !detailDocList[4].show" :value='plans[planIndex].docPrice[4]'
                          class='small-text planItem'>
                    </cell>
                    <cell v-if="detailDocList[4].show" v-html='detailDocList[4].desc' class='desc'></cell>
                </template>

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
                <img src="../../../static/images/kangle_detail.jpg" class='detail_img'>
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
                <flexbox-item  :order="2"><div class="plan-tel"><a href='tel:15810770711' class='tel'><i class="iconfont">&#xe642;</i>咨询</a></div></flexbox-item>
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
                            <cell :title="clause[0]" link="https://www.supplyfintech.com/insurance_clause/kangleBclause1.pdf" class='linkClause'></cell>
                            <cell :title="clause[1]" link="https://www.supplyfintech.com/insurance_clause/kangleBqingzhengclause1.pdf" class='linkClause'></cell>
                            <cell :title="clause[2]" link="https://www.supplyfintech.com/insurance_clause/kangleBmianzhongclause1.pdf" class='linkClause'></cell>
                            <cell :title="clause[3]" link="https://www.supplyfintech.com/insurance_clause/jiankangxingjieshao1.pdf" class='linkClause'></cell>
                        </div>
                    <div class='divstyle'>
                        <p class='pstyle'>投保须知</p>
                            <p>【保险公司】</p>
                            <p>本产品由复星联合健康保险股份有限公司承保。</p>
                            <p>复星联合健康保险股份有限公司是保监会批准设立的专业健康保险公司，公司总部在广东省广州市。</p>
                            <p>【产品介绍】</p>
                            <p>1.适用人群：</p>
                            <p>投保人必须是被保险人本人或被保险人的父母、配偶、子女，且投保人的年龄≥18周岁。</p>
                            <p>投保时年龄在30天-50周岁、身体健康、能正常工作或正常生活的自然人可作为本保险的被保险人。投保时不足一周岁的婴儿，应当出生满30天且已健康出院。</p>
                            <p>2.职业范围：职业类别为1-4类的人群，职业类别参照《复星联合健康职业分类表》。</p>
                            <p>3.犹豫期 : 15天</p>
                            <p>4.等待期：180天</p>
                            <p>5.缴费期间：您可选择缴费期间为5年、10年、20年、30年</p>
                            <p>6.保险期间 : 您可选择保至80岁或至终身</p>
                            <p>7.本产品仅限北京市、广东省辖区域销售</p>
                            <p>【重要告知】</p>
                            <p>1. 保险人就投保人、被保险人的有关情况提出询问的，您应当如实告知。对于故意未如实告知的既往症相关的重大疾病，保险人不承担保险责任，并可以解除合同且不退还保险费。</p>
                            <p>2. 既往症：指在保险人对其保险责任生效之前被保险人已知或应该知道的有关疾病或症状。</p>
                            <p>3. 对于因非意外的原因导致的保险责任，本合同生效日起 180 天内（含第180天）为等待期。等待期内发生的重大疾病，保险人不承担保险责任。</p>
                            <p>4. 本计划为网络销售产品，在线投保后系统会进行核保，核保通过的标准体将即时出具电子保单。</p>
                            <p>5. 您可通过复星联合健康保险全国客服热线4006-11-7777或登录官网（www.fosun-uhi.com）及官方微信公众号进行保单查询、验真。</p>
                            <p>【温馨提示】</p>
                            <p>
                                1. 本保险采用电子保单形式承保，不提供纸质保单。依据《中华人民共和国电子签名法》，电子保单与纸质保单有同等法律效力，也可作为理赔的依据。您可通过复星联合健康保险官网（www.fosun-uhi.com）对电子保单进行验真。</p>
                            <p>2. 复星联合健康保险全国统一客服热线4006-11-7777。</p>
                            <p>
                                3. 投保前，请您认真阅读产品页面展示内容、保险责任、责任免除、合同解除、《复星联合康乐一生重大疾病保险（B款升级款）条款》、《复星联合康乐一生轻症疾病保险（升级款）条款》、《复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款》、《复星联合在线信息披露》以及《客户告知书》等重要内容。</p>
                            <p>【信息披露】</p>
                            <p>
                                复星联合健康保险股份有限公司综合偿付能力充足率、风险综合评级等信息请查询我司官网“公开信息披露”下的“偿付能力信息”栏目（网址：www.fosun-uhi.com ）。截止当前，我司偿付能力充足率达到监管要求。</p>
                            <p></p>
                            <p>该产品由微易保险经纪有限公司负责代销。</p>
                            <p>产品页面仅做产品理解之用，具体内容以正式的保单样式及条款为准，正式保单与条款有冲突之处以保单约定为准，具体保单样式详见保单样式。</p>
                            <p><br></p>
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
                        <p  class='pstyle'>理赔须知</p>
                        <p>本计划由复星联合健康保险股份有限公司承保，您可以通过复星联合健康保险7x24小时客服电话4006-11-7777进行报案理赔，亦可通过保险师客服热线400-186-8878协助办理。</p>
                        <p class='pstyle'>理赔流程</p>
                        <p>理赔咨询</p>
                        <p>理赔咨询请拨打4006-11-7777</p>
                        <p>理赔资料</p>
                        <p>1. 身故、意外及重疾理赔申请书；</p>
                        <p>2. 认可医疗机构出具的被保险人诊断证明、门急诊病历、出院小结、住院病历（加盖医院病历专用章）、手术记录、病理报告；</p>
                        <p>3. 受益人有效身份证件；</p>
                        <p>4. 银行卡复印件。</p>
                        <p>提交申请材料</p>
                        <p>1. 将理赔资料邮寄至我公司指定的联系地址：广州市天河区林和中路8号海航大厦24楼01-05单元，复星联合健康保险股份有限公司理赔中心；</p>
                        <p>2. 方便时亲临我公司营业网点柜面，现场提交理赔资料。</p>
                        <p>理赔审核</p>
                        <p>对于资料齐全、责任明确无需调查的案件，我们将在最多30日内审核完毕。</p>
                        <p>支付保险金</p>
                        <p>我们将在结案或达成给付协议后3个工作日内支付保险金至您指定账户。</p>
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
                <div>
                    <div class='divstyle' style='margin-top: 30px;'>
                        <p  class='pstyle'>常见问题</p>
                        <p class='question' style='margin-top: 0'>Q: 这款产品保障多少种重大疾病呢？</p>
                        <p>A: 本产品可以保障80种重大疾病，具体请查看保险条款对80种重大疾病的释义，并可选择轻症疾病保险。</p>

                        <p class='question'> Q: 本产品是否有犹豫期?</p>
                        <p>A: 本产品为长期产品，有犹豫期，自投保人签收本合同的次日零时起， 有 15日的犹豫期 。</p>

                        <p class='question'>Q: 如果已经有社保，那还有必要买重疾险吗？</p>
                        <p>A: 与社保报销医疗费的方式不同，重疾险是一个专门重疾的保障，一旦确诊为保险责任范围内的疾病，立即赔付，无需提供任何发票。虽然社保覆盖率在逐渐提高，但仅提供基础治疗，不少治疗重疾的药物都不在医保范围内，且价格十分昂贵。重大疾病的治疗费用一般都在30万元左右，所以准备一份重疾保险，可以有效减轻经济压力。</p>
                        <p><br></p>
                    </div>
                </div>
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
                insureYear:'80',
                showTip: false,
                sexNum:'1',
                sexNum2:'0',
                sexList:[
                    {key:'0',value:'女',},
                    {key:'1',value:'男',},
                ],
                isInsure:'1',
                isInsure2:'1',
                relation:'0',
                relationList:[
                    {key:'0',value:'本人',},
                    {key:'1',value:'非本人',},
                ],
                list:[
//                    {key:'0',value:'不投保',},
                    {key:'1',value:'投保',},
                ],
                detailDocList: [
                    {
                        title: "重大疾病保险金（80种）",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外首次发病，或本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因首次发病，并在本公司指定或认可的医疗机构由专科医生确诊为本合同所列的一种或多种重大疾病，本公司按本合同基本保险金额给付重大疾病保险金，同时本合同终止。</p><p>被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起180天内因非意外的原因首次发病并在本公司指定或认可的医疗机构由专科医生确诊为本合同列明的一种或多种重大疾病，本公司将按投保人已交纳本合同累计保险费数额（不计息）给付重大疾病保险金，同时本合同终止。</p></div>'
                    },
                    {
                        title: "身故保险金",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外，或在本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因导致身故，本公司给付身故保险金，同时本合同终止。身故保险金数额为：</p><p>（1）如果被保险人身故时未满18周岁（不含18周岁生日），身故保险金数额等于投保人已交纳的本合同累积保险费数额（不计息）；</p><p>（2）如果被保险人身故时已满18周岁（含18周岁生日），身故保险金数额等于本合同基本保险金额。</p><p>被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起180天内因非意外的原因导致身故，本公司将按投保人已交纳的本合同累计保险费数额（不计息）给付身故保险金，同时本合同终止。</p><p><br></p></div>'
                    },
                    {
                        title: "轻症疾病保险金（35种/3次）【可选】",
                        show: false,
                        desc: '<div><p>被保险人因意外首次发病，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因首次发病，并在本公司指定或认可的医疗机构由专科医生确诊为本附加合同列明的一种或多种轻症疾病，本公司按本附加合同所载明保险金额给付轻症疾病保险金。</p><p>被保险人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因首次发病并在本公司指定或认可的医疗机构由专科医生确诊为本附加合同列明的一种或多种轻症疾病，本公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付轻症疾病保险金，同时本附加合同终止。</p><p>每种轻症疾病限给付一次，给付后该种轻症疾病保险责任终止。不同轻症疾病可以多次给付，但本附加合同的轻症疾病保险金累积给付以三次为限。当累积给付的轻症疾病保险金达到三次时，本附加合同的轻症疾病保险责任终止。</p><p>如果被保险人因同一原因导致其罹患本附加合同所定义的两种或两种以上的轻症疾病，本公司仅按一种轻症疾病给付轻症疾病保险金。</p></div>'
                    },
                    {
                        title: "轻症疾病豁免保费【可选】",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外首次发病，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因首次发病，并在本公司指定或认可的医疗机构由专科医生确诊为本附加合同列明的一种或多种轻症疾病，则自确诊日后首个本附加合同保险费约定交纳日开始，直至本附加合同最后一次保险费约定交纳日止，本公司豁免前述期间内本附加合同及主合同应交纳的保险费。本公司视豁免的保险费为已交纳的保险费，本附加合同及其他被豁免合同继续有效。</p><p>被保险人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因首次发病并在本公司指定或认可的医疗机构由专科医生确诊为本附加合同列明的一种或多种轻症疾病，本公司不承担轻症疾病豁免保险费责任，同时本附加合同终止。</p></span>'
                    },
                    {
                        title: "投保人身故、重疾、轻症及失能豁免",
                        show: false,
                        desc: '<div><p>被保险人在保险期间内因意外首次发病，或本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因身故、或经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，或者首次发生一种或多种重大疾病、轻症疾病，本公司豁免相应豁免保险费期间内该被人名下被豁免保险凭证载明的应交保险费，本公司视豁免的保险费为已交纳的保险费，同时本附加合同终止 。</p></div>'
                    },
                ],
//                checkList: null,
                ischeck: false,
                show1: false,
                show2: false,
                show3: false,
                isShow:false,
                showProfession: false,
                clause: ['复星联合康乐一生重大疾病保险（B款升级款）条款', '复星联合附加康乐一生轻症疾病保险（升级款）条款','复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款','《健康星增值服务》'],
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
                planIndex: 5,//
                payTermIndex: '20',
                plans: [
                    {
                        value: 1,
                        docPrice: ['5万', '5万', '1万', '', '豁免保费'],
                    },
                    {
                        value: 2,
                        docPrice: ['10万', '10万', '2万', '', '豁免保费'],
                    },
                    {
                        value: 3,
                        docPrice: ['15万', '15万', '3万', '', '豁免保费'],
                    },
                    {
                        value: 4,
                        docPrice: ['20万', '20万', '4万', '', '豁免保费'],
                    },
                    {
                        value: 5,
                        docPrice: ['25万', '25万', '5万', '', '豁免保费'],
                    },
                    {
                        value: 6,
                        docPrice: ['30万', '30万', '6万', '', '豁免保费'],
                    },
                    {
                        value: 7,
                        docPrice: ['35万', '35万', '7万', '', '豁免保费'],
                    },
                    {
                        value: 8,
                        docPrice: ['40万', '40万', '8万', '', '豁免保费'],
                    },
                    {
                        value: 9,
                        docPrice: ['45万', '45万', '9万', '', '豁免保费'],
                    },
                    {
                        value: 10,
                        docPrice: ['50万', '50万', '10万', '', '豁免保费'],
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
            };
        },
        components: {
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
                let url=process.env.BASE_URL+process.env.commonPort+'/insurance/fosun/healthNotice';
//                let url=process.env.BASE_URL+':8765/insurance/fosun/healthNotice';
                let privateKey = process.env.fuxingPrivateKey;
                let params={
                    "account":process.env.fuxingAccount,
                    "data":JSON.stringify({"planNo":"JHFUHIKLBA0001","urlParam":"?price="+encodeURIComponent(this.price)+'&insureYear='+encodeURIComponent(this.insureYear)+'&planIndex='+encodeURIComponent(this.planIndex)+'&payTermIndex='+encodeURIComponent(this.payTermIndex)}),
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
                        if(node.val>=1&&node.val<=4){
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
                this.isShow=true;
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
                        "planNo": "JHFUHIKLBA0001",
                        "insuredSex": this.sexNum, //被保人
                        "applicantSex": this.sexNum2, //投保人
                        "applicantAge": this.tool.getAgeByDate(this.defaultDate1),//投保人年龄
                        "insuredAge":this.tool.getAgeByDate(this.defaultDate),//被保人年龄
                        "appInsSame":this.relation, //投保人是否为被保险人 0不是1是
                        "payYears": this.payTermIndex,  //缴费期
                        "amount": this.amountList[this.planIndex].val, //保额
                        "insureYears": this.insureYear, //保障期间
                    })
                };
                countData.sign=md5("account" + account + "data" + countData.data + "reqTid" + reqTid + privateKey).toString().toUpperCase();
                this.submitData=countData
            },
            //发查询请求
            ajaxDataQuery(){
                this.premiumCalculation();
                let url=process.env.BASE_URL+process.env.commonPort+'/insurance/fosun/premiumTrial';
//                let url=process.env.BASE_URL+':8765/insurance/fosun/premiumTrial';
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
            showToast(text){
                this.$vux.toast.show({
                    text: text,
                    type:'text',
                    width:'11em'
                });
            },
            //选择日期或者缴费年期
            changeDateOrTerm(){
                let age= parseInt(this.tool.getAgeByDate(this.defaultDate));
                var oldKey=this.payTermIndex;//在这里，获取一下原来的选中项，放到这个变量
                if(age>=40){
                    this.payTermList=[
//                        {key:'1',value:'趸交'},
                        {key:'5',value:'5年交'},
                        {key:'10',value:'10年交'},
                        {key:'15',value:'15年交'},
                        {key:'20',value:'20年交'},
                    ];
                    if(oldKey=="30"){
                        //原选中项已经无效，需要把下拉控件的选中项设为一个默认值
                        this.payTermIndex="5"
                    }
                }else{
                    this.payTermList=[
//                        {key:'1',value:'趸交'},
                        {key:'5',value:'5年交'},
                        {key:'10',value:'10年交'},
                        {key:'15',value:'15年交'},
                        {key:'20',value:'20年交'},
                        {key:'30',value:'30年交'},
                    ];
                }
                this.ajaxDataQuery()
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
</style>


