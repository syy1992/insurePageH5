<template>
  <div id="car-in-door">
    <img src="../../../static/images/head-car.jpg" class="ban_img">
    <group  :gutter=0>
      <div class="plan-picker-wrap">
        <div class="exhibition-name">{{title}} </div>
        <cell :title='"面积方案"'  class='subTitle'>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
        </cell>
        <cell primary="content" title="请选择展台面积" :value="selectedPlan.name" :is-link=true @click.native="showPlanPopupPicker = true" :arrow-direction='"down"'></cell>
        <popup-picker :show.sync="showPlanPopupPicker" :title="pickertitle"  :show-cell="false" :data="plans" ref="planpicker" @on-change="onChange" :columns="1"></popup-picker>
      </div>
    </group>
    <group v-if='parseInt(selectedPlan.value)>1'  :gutter=10>
      <cell :title='"保费类型"'  class='sub'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>
      <radio :options="premium" v-model=premiumType  ref="radioPremiu" @on-change="premiumchange" ></radio>
      <!--<radio :options="premium" v-model=premiumType @on-change="premiumchange" ref="radioPremiu"></radio>-->
    </group>
    <div class="plan-detail-wrap">
      <group label-width="10em" v-for="(planDetail,index) in exhibitPlanDetails" :key="index" :gutter=10>
        <x-switch  title="展会险" v-model='switch1' @on-change='getPlanNo'></x-switch>
        <cell :title='planDetail.planTitle'  class='subTitle'>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
        </cell>
        <cell v-if='false' :inline-desc='"简介 : "+planDetail.desc'></cell>
        <cell  primary="content"  v-for="(planItem,index) in planDetail.planItems" :title="planItem.title" :key="index" :value="planItem.value" class="planItem"></cell>
      </group>

      <group label-width="10em" v-for="(planDetail,index) in installPlanDetails" :key="index" :gutter=10>
        <x-switch  title="安装工程一切险" v-model='switch2' @on-change='getPlanNo'></x-switch>
        <cell :title='planDetail.planTitle'  class='subTitle'>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
        </cell>
        <cell v-if='false' :inline-desc='"简介 : "+planDetail.desc'></cell>
        <cell  primary="content"  v-for="(planItem,index) in planDetail.planItems" :title="planItem.title" :key="index" :value="planItem.value" class="planItem"></cell>
      </group>


      <img src="../../../static/images/exhibition-detail.jpeg" class="ban_img">
      <flexbox :gutter="0" class="oprations">
        <flexbox-item :span="2/5" :order="1"><div class="plan-price">￥ {{planPrice.name}}</div></flexbox-item>
        <flexbox-item   :order="3"><div class="plan-buy" @click="onConfirmPlan">立即投保</div></flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
    import exhibitData from '../../../static/js/carIndoorData.js'
    import {
        PopupPicker,
        Group,
        Cell,
        Loading,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem,Radio,
        XSwitch,
        querystring
    } from 'vux'

    export default {
        name: 'carindoor',
        directives: {
            TransferDom
        },
        data(){
            return {
                picSrc: require('../../../static/images/icon.png'),
              /*title相关*/
                title: "车展展会保险--馆内方案",
              /*planpicker相关的数据 start*/
                showPlanPopupPicker: false,
                pickertitle: '展台面积',
                selectedPlan: {},
                premium: exhibitData.premium,
                premiumType: '单层',
                planPrice: {
                    name: '',
                    value: ''
                },
                plans: exhibitData.carIndoorData,
                exhibitPlanDetails: exhibitData.planDetails,
                installPlanDetails: exhibitData.installPlanDetails,
                switch1: true,
                switch2: true,
                planNo: '',
              /*planpicker相关的数据 end*/
            }
        },
        components:{
            PopupPicker,Group,Cell,Loading,Flexbox, FlexboxItem,Radio,XSwitch
        },
        methods:{
            onConfirmPlan:function(){
                if(!this.switch1&&!this.switch2){
                    this.$vux.toast.text('至少选择一个险种进行投保', '')
                    return;
                }else{
                    let  planType = querystring.parse(location.search.substr(1)).type;
                    var applyurl = '/page/exhibitionapply?'+'planNo='+encodeURIComponent(this.planNo)+'&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name)+'&planType='+planType;
                    window.open(applyurl,'_self');
                }
            },
            onChange (val) {
                this.selectedPlan =this.plans;
                var _value = val;
                this.selectedPlan = this.plans.filter((plan)=>{
                    return plan.value== _value;
                })[0];

                console.log(' this.selectedPlan='+ JSON.stringify(this.selectedPlan))
                if(parseInt(_value)>21){
                    this.exhibitPlanDetails=exhibitData.planDetails1;
                }else {
                    this.exhibitPlanDetails=exhibitData.planDetails;
                };
                if(_value){
                    this.installPlanDetails=[exhibitData.installPlanDetails1[_value]];
                };

                //设置默认
                this.$nextTick(function(){
                    var radior = this.$refs.radioPremiu;
                    if(radior){
                        radior.currentValue = this.premium[0].key;
                    }
                });

                this.selectedPlan.stories='1';
                this.getPlanNo()
            },
            premiumchange(value, label){
                //改变单双层
                if(!!value){
                    var selectedPremium = this.premium.filter((p)=>{return p.key == value;})[0];
                    console.log('selectedPremium='+JSON.stringify(selectedPremium))
                    console.log('selectedPremium.key='+selectedPremium.key);
                    this.selectedPlan.stories = selectedPremium.key;
                }
                this.getPlanNo()
            },
            //得到计划编号,显示价格
            getPlanNo(){
                if(this.switch1){
                    this.selectedPlan.showExhibit='A';
                }else{
                    this.selectedPlan.showExhibit='';
                };
                if(this.switch2){
                    this.selectedPlan.showInstall='B';
                }else{
                    this.selectedPlan.showInstall='';
                };

                this.planNo='JHOFFLCARIN'+this.selectedPlan.value+this.selectedPlan.stories+this.selectedPlan.showExhibit+ this.selectedPlan.showInstall;
//          this.planPrice.name=exhibitData.plan[this.planNo];
                if(!this.switch1&&!this.switch2){
                    this.planPrice.name='--';
                }else{
                    this.planPrice.name=exhibitData.plan[this.planNo];
                }
            },
        },
        created(){},
        mounted(){
            this.selectedPlan = this.plans[0];
            this.selectedPlan.stories='1';//默认层数
            this.getPlanNo()
        }
    }
</script>

<style lang="scss">
  @function r($px){
    @return $px /2/18.75 * 1rem;
  }
  $OperatorHeight:3rem;
  $BaseFontSize:0.9rem;
  $otherFontSize:1rem;
  $lineheight:1.5rem;
  $baseColor:#ff4200;
  #car-in-door{
    .vux-label{line-height:$lineheight }
    padding-bottom: $OperatorHeight;
    .ban_img{
      width: 100%;
    }
    .exhibition-name{
      color: #000;
      padding: 10px 15px;
      font-size: 1.125rem;
    }
    .planItem{
      $cell-value-color:#000;
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
        color: $baseColor;
        line-height: $OperatorHeight;
      }
      .plan-share{
        background-color: #ffb938;
        letter-spacing: 0.01rem;
      }
      .plan-buy{
        background-color: $baseColor;
        letter-spacing: 0.01rem;
      }
    }
    .plan-picker-wrap{

      .vux-cell-bd{
        font-size: $BaseFontSize;
      }
      .vux-cell-primary {
        font-size: $BaseFontSize;
      }
      .vux-cell-arrow-down{
        :after{
          color: green;
        }
      }
    }
    .plan-detail-wrap{
      .vux-label-desc{
        font-size: $BaseFontSize;
      }
      .vux-label{
        font-size: $BaseFontSize;
        /* line-height:  $lineheight;*/
      }
      .vux-cell-primary {
        font-size: $BaseFontSize;
      }
    }
    .weui-cells{
      font-size: $BaseFontSize;
    }
    .weui-cell_access {
      .weui-cell__ft {
        &:after {
          margin-top: -6px;
        }
      }
    }
    .subTitle{
      &:before {
        left:0
      }
    }
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
  }
  .weui-toast_text{
    .weui-toast__content{font-size: 0.8rem}
  }
</style>
