<template>
  <div id="anxin_applicant">
    <div class="plan-info" ref='ul'>
      <div style='padding: 10px 15px'>
        <div class="plan-info-lable">已选择保障计划</div>
        <div class="plan-info-content">
          <span>保障方案：{{planInfo}}</span>
          <!--<span>保费：{{planPrice}}元</span>-->
           <!--<span style='float: right;color: #FC9020;margin-right: 0' @click='editPlan'>修改 ></span>-->
        </div>
      </div>
    </div>

    <group :title='""' :gutter=70>
      <cell :title='"投保人信息"'  >
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <x-input title="姓名" required placeholder="请输入姓名" text-align='left' v-model="applicantName" ref='applicantName' class="applicantNameClass"></x-input>
      <x-input title="身份证号" required placeholder="请输入身份证号" text-align='left'  v-model="applicantIdCard" :is-type="validateIdCard" ref="applicantcid" class="applicantIdCardClass"></x-input>
      <x-input title="电话号码" keyboard="number" required placeholder="请输入电话号码" text-align='left'  v-model="applicantPhone" is-type="china-mobile" class="applicantPhoneClass"></x-input>
      <x-input title="邮箱" required placeholder="请输入邮箱" text-align='left'  v-model="applicantMail" is-type="email" class="applicantMailClass"></x-input>
    </group>
    <group :title='""' :gutter=10  class='relationpick'>
      <cell :title='"被保人信息"'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
      </cell>
      <popup-picker title="与投保人关系"    :data="list" v-model="assured" value-text-align="left" @on-change='changeRelationPicker' ></popup-picker>
    </group>

    <group :title='""' :gutter=0 class='insuredInfo' v-show='isShow'>
      <x-input title="姓名" required placeholder="请输入姓名" text-align='left' v-model="insuredName" class="insuredNameClass"></x-input>
      <x-input title="身份证号" required placeholder="请输入身份证号" text-align='left'  v-model="insuredIdCard" :is-type="validateIdCard"  ref="insuredcid" class="insuredIdCardClass"></x-input>
      <x-input title="电话号码"  keyboard="number" required placeholder="请输入电话号码" text-align='left'  v-model="insuredPhone" is-type="china-mobile" class="insuredPhoneClass"></x-input>
      <x-input title="邮箱" required placeholder="请输入邮箱" text-align='left'  v-model="insuredMail" is-type="email" class="insuredMailClass"></x-input>
    </group>

    <div class="plan-picker-wrap clause_confirm">
      <check-icon :value.sync="ischeck"> </check-icon>
      <span style='line-height: 1.5rem;font-size: 0.82rem'>本人承诺投保信息的真实性，理解并同意
        <a class='link' @click='showDesc1=true'>《投保须知》</a>、<a class='link' @click='showDesc2=true'>《保险条款》</a>、
        <a class='link' @click='showDesc3=true'>《投保声明》</a>、<a class='link' @click='showDesc4=true'>《如实告知声明》</a>、<a class='link'  @click='showDesc5=true'>《除外责任》</a>的全部内容</span>
      <!--<p>本产品由平安保险股份有限公司承保</p>-->
      <p class='t-source'>温馨提示：投被保人信息绝对保密,仅供保单投保使用,该保单应由投保人支付</p>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc1" position="bottom" max-height="50%">
        <div class='close' @click="showDesc1 = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
            <p class='pstyle'>投保须知</p>
            <div class="article">
              <p>1.本保险产品名为安享一生癌症医疗险，由安心财产保险有限责任公司（以下简称“本公司”或“安心保险”）承保，通过互联网在全国区域销售（除港、澳、台地区）。</p>
              <p>2.投保人：18周岁及以上且有完全民事行为能力人。</p>
              <p>3.被保险人：出生满28天至70周岁。</p>
              <p>4.保险期间：一年。</p>
              <p>5.缴费方式：一次性缴费。</p>
              <p>6.每一被保险人同期<strong>限投保一份</strong>，多投保无效。</p>
              <p>7.投保规则：</p>
              <p>1）投保人与被保险人应为以下关系：本人、配偶、子女、父母；投保人不得为不满足上述关系的被保险人投保；</p>
              <p>2）《个人健康告知书》，存在选项为“是”的告知项则不予承保。</p>
              <p>8.生存受益人必须为本人。</p>
              <p>9.免赔额：<strong>本保险免赔额为0。</strong></p>
              <p>10.赔付比例：<strong>被保险人已从社会基本医疗保险、公费医疗或商业保险机构费用补偿型产品获得费用补偿，赔付比例为100%； 被保险人未从社会基本医疗保险、公费医疗或商业保险机构费用补偿型产品获得费用补偿，赔付比例为50%。</strong></p>
              <p>11.等待期：投保人首次投保或非连续投保本保险的，<strong>自本保险合同生效之日起90日为等待期。</strong>在本保险合同有效期间内，经医院的专科医生确诊初次患有癌症的，保险人承担下列“癌症确诊费用保险金”和“癌症治疗费用保险金”两项保险责任。<strong>被保险人在等待期内经医院专科医生确诊发生癌症的，保险人不承担赔偿责任。若连续投保的被保险人在往年合同的保险期间内已经确诊为癌症的，保险人豁免在本保险期间内对被保险人初次确诊的要求。</strong></p>
              <p><strong>12.连续投保：本保险合同期满后15日内，经投保人申请,保险人签发保单，视同为连续投保。</strong></p>
              <p>13.医院：是指经中华人民共和国卫生部门审核认定的二级或以上的公立医院，即综合性公立医院或专科公立医院，不包括如下机构或医疗服务：</p>
              <p>（1） 特需医疗、外宾医疗、干部病房、联合病房、国际医疗中心、VIP部、联合医院；</p>
              <p>（2） 诊所、康复中心、家庭病床、护理机构；</p>
              <p>（3） 休养、戒酒、戒毒中心。</p>
              <p>该医院必须具有系统的、充分的诊断设备，全套外科手术设备及能够提供二十四小时的医疗与护理服务的能力或资质。</p>
              <p>14.投保：投保人填写个人投保信息并选择所需的保险计划，核保通过后，投保人可通过网上银行、微信钱包等支付方式缴纳保费至安心保险指定账户，保险合同成立并生效。</p>
              <p>15.承保：安心保险实时接受客户投保信息，并由系统实时完成核保，核保通过且保费到账后完成保险承保。</p>
              <p>16.退保/批改：投保人拨打<strong>安心全国客服专线95303</strong>发起退保/批改的申请，并提供完整的申请材料，安心保险审核后，10个工作日内完成审核，退保保费会退还至投保人指定账户。退保规则：保单生效前或生效后未超过48小时的，投保人要求解除合同，自安心保险接到投保人申请后，本合同效力终止，并全额退还保费。保单生效超过48小时，投保人要求解除合同，自安心保险接到申请书之次日零时起，本合同效力终止，保险人收到证明文件和材料之日起30日内退还未满期净保费。<strong>未满期净保险费=保险费×（1－保险单已经过天数/保险期间天数）×（1-35%），经过天数未满一天的按一天计。</strong></p></div>
              <p>17.本保险自投保人投保支付成功后次日零时起生效。</p>
             <p>18. 本产品采用电子保单形式承保，法律效力等同于纸质保单。投保人可登陆本公司官网https://www.95303.com/，进入“安心服务”菜单进行保单查询、验真及电子保单下载等操作。如需要纸质保单及发票，请拨打<strong>安心全国客服专线95303</strong>，我们提供顺丰快递到付服务。 </p>
              <p>19.如实告知：投保人如投保本保险，应依法履行如实告知义务。</p>
              <p>20.投保本保险前，请投保人认真阅读产品页面展示内容以及《安心财产保险有限责任公司癌症医疗保险条款（2017版）》，请务必阅读其中的责任免除部分。</p>
              <p>21.我们严格遵守现行的关于个人信息、数据及隐私保护的法律法规，采取充分的技术手段和制度管理，保护您提供给我们的个人信息、数据和隐私不受到非法的泄露或披露给未经许可的第三方。在必要情形下第三方可能接触并使用您的个人信息，包括得到授权的安心保险员工、以及不时执行与我们的业务、营销活动和数据整理有关工作的其他公司或人员。所有此类人员及公司均需遵守相关保密协议，同时也需要遵守国家关于个人信息保护有关的法律法规，以确保您的个人信息随时得到保护。除上述用途外，安心保险不会将您的个人信息用于任何未经您同意的用途。除了我们的业务合作伙伴、我们的法律顾问、外部审计机构或按照法律规定、监管规定或法庭裁决之外，我们不会将所接受的任何个人信息泄露、篡改、毁损、出售或者提供给任何第三方。</p>
              <p>22.偿付能力告知：安心财产保险有限责任公司2017年4季度核心偿付能力充足率为408.46%；综合偿付能力充足率为408.46%；偿付能力充足率已达到监管要求。</p>
              <p>23.风险综合评级告知：中国保监会发布了2017年3季度风险综合评级结果，安心财产保险有限责任公司被评定为B类。</p>
              <p><strong>24.温馨提示：咨询投诉请致电安心全国客服专线 95303。</strong></p>
            <p><br></p>
          </div>

        </group>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="showDesc2" position="bottom" height="50%" style='background: #ffffff'>
        <div class='close' @click="showDesc2 = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div title='产品条款' class='divstyle'>
            <p class='pstyle' >保险条款</p>
            <cell :title="clause[0]" link="" class='linkClause' style='margin-top: 5px;'></cell>
            <cell :title="clause[1]" link="" class='linkClause'></cell>
            <cell :title="clause[2]" link="" class='linkClause'></cell>
          </div>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc3" position="bottom" max-height="50%">
        <div class='close' @click="showDesc3 = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
              <p class='pstyle'>投保声明</p>
              <div class="article ">
                <p>《癌症医疗保险（2017版）投保声明》</p>
                <p>1. 本人自愿投保贵公司《安心财产保险有限责任公司癌症医疗保险（2017版）》，并声明以上陈述及各项细节均真实无讹，且没有隐瞒任何重大事实以影响贵公司评估风险或接受本投保申请。</p>
                <p>2. 本人已认真阅读《安心财产保险有限责任公司癌症医疗保险（2017版）》的所有条款，尤其是“<strong>不能获得赔偿的情形</strong>”，并对贵公司就保险合同的内容说明和提示完全理解，包括<strong>免赔额、免赔率、比例赔付或给付等，及免除或者减轻保险人责任的条款均</strong>无异议，申请投保。</p>
                <p>3. 本人知晓本投保申请将构成投保人与贵公司所签署的保险合同的依据，若未能披露与本保险相关之重大事实将可能导致贵公司不承担任何保险责任。保险合同生效日期以保险单所载生效日期为准，贵公司承担保险责任须以投保人缴付约定保险费并经贵公司同意承保为前提。</p>
                <p>4. 个人信息授权收集及使用：在您点击已阅读本投保须知时，视为您已授权我们在法律、法规允许的范围内通过第三方获取与您投保及我们履行保险合同有关的任何您本人的个人信息，用于我们的核保等业务流程。我们将严格遵守现行的关于个人信息、数据及隐私保护的法律法规，采取充分的技术手段和制度管理，保护您提供给我们的或我们通过合法方式从第三方获取的个人信息、数据和隐私不受到非法的泄露或披露给未经许可的第三方。在必要情形下第三方可能接触并使用您的个人信息，包括得到授权的安心保险员工、以及不时执行与我们的业务、营销活动和数据整理有关工作的其他公司或人员。所有此类人员及公司均需遵守相关保密协议，同时也需要遵守国家关于个人信息保护有关的法律法规，以确保您的个人信息随时得到保护。除上述用途外，安心保险不会将您的个人信息用于任何未经您同意的用途。除了我们的业务合作伙伴、我们的法律顾问、外部审计机构或按照法律规定、监管规定或法庭裁决之外，我们不会将所接受的任何个人信息泄露、篡改、毁损、出售或者提供给任何第三方。</p>
            </div>
          </div>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc4" position="bottom" max-height="50%">
        <div class='close' @click="showDesc4 = false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
            <p class='pstyle'>如实告知声明</p>
            <div class="article ">
              <p>本人已了解发生理赔时，安心公司会对投保人填写的各项信息进行核实，如发现投保人违反了如实告知，根据《保险法》的规定，安心公司将不承担赔偿或给付保险金的责任。</p>
              <p>本人已阅读并了解如下法律条文的内容，对内容无异议。</p>
              <p><strong>《中华人民共和国保险法》第十六条：</strong></p>
              <p>“订立保险合同，保险人就保险标的或者被保险人的有关情况提出询问的，投保人应当如实告知。”</p>
              <p>“投保人故意或者因重大过失未履行前款规定的如实告知义务，足以影响保险人决定是否同意承保或者提高保险费率的，保险人有权解除合同。”</p>
              <p>“投保人故意不履行如实告知义务的，保险人对于合同解除前发生的保险事故，不承担赔偿或者给付保险金的责任，并不退还保险费。”</p>
              <p>“投保人因重大过失未履行如实告知义务，对保险事故的发生有严重影响的，投保人对于合同解除前发生的保险事故，不承担赔偿或者给付保险金的责任，但应当退还保险费。”</p>
              <p>* 在刑法中还有关于保险诈骗罪的有关规定，保险诈骗罪是指以非法获取保险金为目的，违反保险法规，采用虚构保险标的、保险事故或者制造保险事故等方法，向保险公司骗取保险金，数额较大的行为。“虚构保险标的”，是指投保人违背《保险法》规定的如实告知义务，虚构一个根本不存在的保险标的或者将不合格的标的伪称为合格的标的，与保险人订立保险合同的行为。</p>
              <p><strong>《刑法》第一百九十八条：</strong></p>
              <p>进行保险诈骗活动，数额较大的，处五年以下有期徒刑或者拘役，并处一万元以上十万元以下罚金；数额巨大或者有其他严重情节的，处五年以上十年以下有期徒刑，并处二万元以上二十万元以下罚金；数额特别巨大或者有其他特别严重情节的，处十年以上有期徒刑，并处二万元以上二十万元以下罚金或者没收财产。</p>
            </div>
          </div>
        </group>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showDesc5" position="bottom" max-height="50%">
        <div class='close' @click="showDesc5= false" >
          <x-icon type="ios-close-empty" size="30"></x-icon>
        </div>
        <group>
          <div class='divstyle'>
            <p class='pstyle'>责任免除</p>
            <div class="article ">
              <p>第一条任何在下列期间发生的或因下列情形之一导致的癌症确诊或治疗医疗费用支出，保险人不承担保险金给付责任：</p>
              <p>（一）被保险人感染艾滋病病毒或患艾滋病期间；</p>
              <p>（二）核爆炸、核辐射或核污染；</p>
              <p>（三）被保险人在本保险合同生效前所患癌症或出现的症状、体征，但保险人在承保时已知晓并做出书面认可的不在此限；</p>
              <p>（四）任何职业病、先天性畸形、先天性恶性肿瘤（BRCA1/BRCA2 基因突变家族性乳腺癌、遗传性非息肉病性结直肠癌、肾母细胞瘤即Wilms瘤、李-佛美尼综合症即Li-Fraumeni综合症）、遗传性疾病或染色体异常（依照世界卫生组织《疾病和有关健康问题的国际统计分类》（ICD-10）确定）引起的医疗费用；</p>
              <p>（五）接种预防癌症的疫苗、进行基因测试（不包含因癌症治疗用药所必需的基因检测）、鉴定癌症的遗传性、接受实验性医疗以及采取未经科学或医学认可的医疗手段；</p>
              <p>（六）由于医疗事故引起的医疗费用；</p>
              <p>（七）滋补类中草药费用，即以提高人体免疫力为主要用途的使用的中草药及成药，包括但不限于人参、阿胶、鹿角胶、龟鹿二仙胶、龟板胶、鳖甲胶、马宝、珊瑚、玳瑁、冬虫夏草、藏红花、羚羊、犀角、牛黄、麝香、鹿茸、铁皮枫斗以及用中药材和中药饮片炮制的各类酒制剂。</p>
              <p>第二条 被保险人在等待期内经医院专科医生确诊发生癌症的，保险人不承担赔偿责任。</p>
            </div>
          </div>
        </group>
      </popup>
    </div>
    <div v-transfer-dom id='transfer-dom'>
      <confirm v-model="show"  title="温馨提示" confirm-text='去修改' @on-confirm="onConfirm">
        <p style="text-align:center;">
          被保人年龄为{{age}}周岁，<br>
          当前所选投保年龄段为{{planInfo}}
        </p>
        <small style='font-size: 0.7rem'>年龄段修改可能引起产品相关信息变更</small>
      </confirm>
    </div>
    <div v-transfer-dom id='edit'>
      <popup v-model="isShowPlan" height='60%'>
        <popup-header  title="保障方案" :show-bottom-border="false" @on-click-right="isShowPlan = false"> </popup-header>
        <x-icon type="ios-close-empty" size="30" @click='isShowPlan = false'></x-icon>
        <div class='pop-main'>
          <div class="contain">
            <!--<group :gutter=0>-->
              <cell title="投保年龄" value="28天-70周岁"></cell>
              <datetime format="YYYY-MM-DD"  v-model='defaultDate'   :start-date="endDate"  :end-date="startDate" title="出生日期" @on-change='initDate'></datetime>
              <cell title="保障期限" value="1年"></cell>
            <!--</group>-->
          </div>
        </div>
        <div class='pop-footer' @click='onConfirmEdit'>
          确定
          <!--<a class='pop-footer-btn ' @click='alertNo'>不符合</a><a class='pop-footer-btn ok' @click='confirmOk'>符合</a>-->
        </div>
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
        <div class="plan-buy"   @click="anxinApply">立即投保</div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>

    import {
        XHeader,
        Group,
        Cell,
        Loading,
        Confirm,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem,
        Radio,
        XInput,
        XButton,
        querystring,
        md5,
//        ChinaAddressData, XAddress,
        PopupPicker,
        Popup,
        CheckIcon,
        AlertModule, Alert,
//    Checklist,
        Value2nameFilter as value2name,
        Datetime,
        Selector,
        PopupHeader
    } from 'vux'

export default {
  name: 'insure',
  directives: {
    TransferDom
  },
    data(){
        let queryObj = querystring.parse(location.hash.split("?")[1]);
        return {
            show:false,
            showDesc1:false,
            showDesc2:false,
            showDesc3:false,
            showDesc4:false,
            showDesc5:false,
            isFetching:false,
            ischeck:false,
            isShow:false,
            isShowPlan:false,
//            editPopShow:false,
            age:0,
            defaultDate:'',
            startDate:'',
            endDate:'',
            clause: ['癌症医疗保险条款（2017版）', '电子保单范本','费率表'],
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
            assured: ['本人'],
            relationNumber:0,
            list: [[]],
            copyUserData:null,
            relationData: [
                {'label':'0','value':'本人'},
                {'label':'1','value':'配偶'},
                {'label':'2','value':'父母'},
                {'label':'3','value':'子女'},
                {'label':'5','value':'兄弟姐妹'},
                {'label':'6','value':'祖父母、外祖父母'},
                {'label':'7','value':'雇佣'},
                {'label':'9','value':'其他'},
            ],

//        platNo:querystring.parse(location.href.substr(1)).platNo,//平台编号
            planNo:decodeURIComponent(queryObj.planNo||''),//方案编号,
            planPrice:decodeURIComponent(queryObj.planprice||''),//方案价格,
            planInfo:decodeURIComponent(queryObj.planinfo||''),//方案信息,
            id:decodeURIComponent(queryObj.id||''),//方案id
            applicantName:'',//投保人
            applicantIdCard:'',//身份证
            applicantPhone:"",//投保人电话
            applicantMail:'',//邮箱

            insuredMail:'',//被保人邮箱
            insuredPhone:'',//被保人电话
            insuredIdCard:'',
            insuredName:'',
        }
    },
    components:{
        Group,Cell,Loading,XHeader,Confirm,Flexbox, FlexboxItem,Radio,XInput,XButton,PopupPicker,CheckIcon,AlertModule, Alert,Selector, Popup,PopupHeader,Datetime,
    },
    methods:{
        onConfirm(){
            this.isShowPlan=!this.isShowPlan;
            this.initDefaultDate();
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
      /*提交 方案*/
        anxinApply(){
          /*配置信息相关*/
            var that = this;
            var reqTid = new Date().getTime();
            var account =process.env.anxinAccount;
            var privateKey = process.env.anxinPrivateKey;
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
                            },
                        },
                        insuredList: [{
//                            insured: {
                                type: '0',
                                naturePerson: {
                                    name: this.insuredName,
                                    paperworkType: "01",
                                    paperworkNo: this.tool.idcardConvert(this.insuredIdCard),
                                    phone: this.insuredPhone,
                                    mail: this.insuredMail,
                                },
//                            }
                        }],
                        beneficiaryList: [],//受益人
                        extendInfo: {
                                amount: 2000000,
                                premium: 1
                        },
                        commonInfo: {
                            platNo: account,//平台编号
                            planNo: this.planNo,//产品方案编号
                            isGroup: '0',
                            appInsRelation: this.relationNumber,//投保人被保险人关系
                            insBenRelation: '0',//被保险人受益人关系
                            num: '1',//投保份数
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
        validateInputVal() {
            //this.relationNumber==0 投保人为本人
            var that = this;
            if (this.relationNumber == 0) {

                if (!this.applicantName) {
                    this.showToast('投保人姓名不能为空')
                    return false;
                }
                if (!this.applicantIdCard) {
                    this.showToast('投保人身份证号不能为空');
                    return false;
                }
                if (this.$refs.applicantcid.valid == false) {
                    this.showToast('投保人身份证格式不正确')
                    return false;
                }
                if (this.tool.GetAge(this.getInsurePersonIdCardNum())<18) {
                    this.$vux.toast.show({
                        text: '投保人不满18周岁不能进行投保',
                        type:'text',
                        width:'13em'
                    });
                    return false;
                }
                if (!this.applicantPhone) {
                    this.showToast('投保人电话号码不能为空')
                    return false;
                }
                if (!this.applicantMail) {
                    this.showToast('投保人邮箱不能为空')
                    return false;
                }
                if (!this.ischeck) {
                    this.$vux.toast.show({
                        text: '请阅读投保须知',
                        type: 'text',
                        onHide() {
                            that.scroll('clause_confirm')
                        }
                    });
                    return;
                }

            } else {
                if (!this.applicantName) {
                    this.showToast('投保人姓名不能为空')
                    return false;
                }
                if (!this.applicantIdCard) {
                    this.showToast('投保人身份证号不能为空')
                    return false;
                }
                if (!this.applicantIdCard) {
                    this.showToast('投保人身份证号不能为空');
                    return false;
                }
                if (this.$refs.applicantcid.valid == false) {
                    this.showToast('投保人身份证格式不正确')
                    return false;
                }
                if (!this.applicantPhone) {
                    this.showToast('投保人电话号码不能为空')
                    return false;
                }
                if (!this.applicantMail) {
                    this.showToast('投保人邮箱不能为空')
                    return false;
                }
                if (!this.insuredName) {
                    this.showToast('被保人姓名不能为空')
                    return false;
                }
                if (!this.insuredIdCard) {
                    this.showToast('被保人身份证号不能为空');
                    return false;
                }
                if (this.$refs.insuredcid.valid == false) {
                    this.showToast('被保人身份证格式不正确')
                    return false;
                }
                if (!this.insuredPhone) {
                    this.showToast('被保人电话号码不能为空')
                    return false;
                }
                if (!this.insuredMail) {
                    this.showToast('被保人邮箱不能为空')
                    return false;
                }
                if (!this.ischeck) {
                    this.$vux.toast.show({
                        text: '请阅读投保须知',
                        type: 'text',
                        onHide() {
                            that.scroll('clause_confirm')
                        }
                    });
                    return;
                }

            }

            //取被保人年龄，判断是否有符合的方案，无则提示
            let idCard = this.getInsurePersonIdCardNum();
//            console.log('idCard='+idCard)
            let age = this.tool.GetAge(idCard);
            let plan = this.getPlanByAge(age);
            if (plan == null) {
                this.showToast('您的年龄不符合投保范围');
                return false;
            }

            //检测身份证号中的实际年龄与方案是否符合
            if(!this.checkAgeRange()){
                return;
            }

            //发出投保请求
            this.ajaxApplyQuery()

        },
        //发出投保请求
        ajaxApplyQuery(){
            this.isFetching = true;//show loading
            this.$http.post(process.env.BASE_URL+process.env.commonPort+'/insurance/cancer/apply',this.copyUserData).then(({data}) => {
                if(data.resCode=='0000'){
                    this.isFetching = false;
                    let dataObj=data.data;
                    console.log(dataObj)
                    let requestCode='DC000425';
                    let payOrderNo=dataObj.responseList[0].order.payOrderNo;
                    let totalPremium=dataObj.responseList[0].order.totalPremium;
                    let applyurl = '/getValue?requestCode='+requestCode+'&payOrderNo='+encodeURIComponent(payOrderNo)+'&totalPremium='+encodeURIComponent(totalPremium);
                    this.$router.push({path:applyurl});
                }else{
                    this.showToast(data.resMsg)
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
        //校验身份证
        isIdCard(value){
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            let regResult=reg.test(value);
            return {
                valid: regResult === true,
                msg: "身份证格式不正确!"
            }
        },

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
        showToast(text){
            this.$vux.toast.show({
                text: text,
                type:'text',
                width:'10em'
            });
        },
        /**
         * 获取被投保人身份证号（如果选择的是【本人】，即为投保人身份证号）
         **/
        getInsurePersonIdCardNum(){
            if(this.relationNumber==0){
                //选择的是【本人】，则使用投保人身份证号
                 return this.applicantIdCard.toString();
            }else{
                return this.insuredIdCard.toString();
            }
        },
        checkAgeRange(){
            //获取被保人（如果选择了【本人】，则为投保人）身份证号
            let idCardNumStr=this.getInsurePersonIdCardNum()
            let age=this.tool.GetAge(idCardNumStr);
            console.log('age='+age)

            //获取用户在上一页传入的id对应的方案
            var plan=this.getPlanById(this.id);

            if(plan.minAge<=age&&age<=plan.maxAge){
                console.log('身份证号与方案符合')
                return true;
            }else {
                //弹出 需修改方案 的提示
                this.show=true;
                this.age=age;
                this.planInfo=plan.name;
                return false;
            }
        },
        /**
         * 根据id获取plan
         **/
        getPlanById(planId){
            let list=this.plans[0]
            for(let i=0;i<list.length;i++){
                if(planId==list[i].id){
                    return list[i];
                }
            }
            return null;
        },
        /**
         * 根据id获取plan
         **/
        getPlanByAge(age){
            let list=this.plans[0]
            for(let i=0;i<list.length;i++){
                if(list[i].minAge<=age&&age<=list[i].maxAge){
                    return list[i];
                }
            }
            return null;
        },
        initDefaultDate(){
            let cid=this.getInsurePersonIdCardNum()
            this.defaultDate= this.tool.getBirthdayStr(cid).toString();
            return this.defaultDate;
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
        //初始化开始日期
        initDate(){
            var today=new Date();
            var beforeData=this.plusDay(today,-26)//测试
            //70年前
            var date2=this.getDateOffsetYear(today,-70)//测试
            this.endDate=this.formatDate(date2);
            this.startDate=this.formatDate(beforeData);
            console.log("endDate="+this.endDate)
            console.log("startDate="+this.startDate)
        },
        //点击确定修改
        onConfirmEdit(){
            let age=this.tool.getAgeByDate(this.defaultDate);
            console.log('age='+age)
            let list = this.plans[0]
            let minAge = '';
            let maxAge = '';
            for (let i in list) {
                minAge = list[i].minAge;
                maxAge = list[i].maxAge;
                if (minAge <= age && age <= maxAge) {
                    this.planNo = list[i].planNo;
                    this.planInfo = list[i].name;
                    this.id = list[i].id;
                    this.planPrice = list[i].price.value;
                    this.isShowPlan = false;
                }
            }

        },

    },
    mounted(){
        this.initRelation();
        console.log(this.planPrice)
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

  #anxin_applicant .weui-cells_radio .weui-check:checked + .weui-icon-checked:before{
    color: $orangeColor;

  }
  #anxin_applicant .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color: $orangeColor;
  }

  #anxin_applicant {
    color: $BaseColor;
    .vux-check-icon{
      span{font-size:$otherFontSize }
    }
    .clause_confirm{
      margin-bottom:$OperatorHeight ;
      padding: 15px;
      font-size: $otherFontSize;
      line-height: 20px;
      .link{
        color:#68a6f5;
        font-size:$otherFontSize
      }
    }
    .plan-picker-wrap{padding: 15px;font-size: $otherFontSize;text-align: justify;line-height: 20px;margin-bottom: 3rem}
    .plan-info{
      position: fixed;
      top: 0;
      z-index: 100;
      background: #fff;
      width: 100%;
      .plan-info-lable{color: #959595;font-size: 0.7rem}
      .plan-info-content{
        line-height: 1.5rem;
        span{
            color:$BaseColor;margin-right: 0.5rem;
        }
        font-size: 0.95rem;
      }
    }
    /*  .weui-label{color:$BaseColor;}*/
    .weui-cell{
      /*&:before{right: 15px;}*/

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
    .vux-cell-box{
      /*position: relative;*/
      &:before{
        /*right: 15px;*/
        /*display:none ;*/
      }
      &:not(:first-child){&:before{
        right: 15px;
        /*display:none ;*/
      }
      }
    }

    .weui-cells{
      font-size: $BaseFontSize;
      &:after{display: none};
      &:before{display: none};
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

  #transfer-dom {
      .vux-x-dialog {
          .weui-dialog__btn {
              &:first-child {
                  color: $halfBlackColor;
              }
          }
      }
  }
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
    }
    .vux-popup-dialog{
      background: #fff;
      .weui-cells{
        &:after{
          display: none;
        };
        margin-top:40px
      }
      #Layer_1{position: absolute;right: 15px;top:5px}

    }
  }
  .divstyle{
    font-size: 0.7rem; text-align: left;padding: 5px 15px;color: #666;
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
    height: 40px;
    background: #ccc;
    text-align: right;
    z-index: 1000;
    -webkit-transition-duration: 300ms;
    transition-duration: 300ms;
  }
  .dp-container {.dp-header{.dp-item.dp-right{color: $orangeColor;}}}
  #edit{
    .vux-popup-dialog{overflow-y: hidden;}
    .pop-main{
      width: 100%;overflow-y: scroll;height: 78%;box-sizing: border-box;
      .contain{
        font-size: $BaseFontSize;
          position: relative;
          &:after{
            content: " ";
            position: absolute;
            bottom: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            color: #D9D9D9;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            width: 100%;
          }
        .weui-cell{
        line-height: $BaseLineHeight;
          &:before{display: none;}
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
          width: 100%;
        }
        }
        vux-datetime {
          font-size: $BaseFontSize;
        }
        .vux-cell-bd{.vux-label{line-height: $BaseLineHeight;font-size: $BaseFontSize}}
      }
      p{font-size:$BaseFontSize }
    }
    .pop-footer{
      /*display: flex;*/
      height: 44px;
      line-height: 44px;
      /*font-size: 0.8rem;*/
      background-color: #fbf9fe;
      position: absolute;
      color:#fff;
      bottom: 0;
      width: 100%;
      margin: auto;
      text-align: center;
      background: $orangeColor;

    }
  }
</style>
