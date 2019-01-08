<template>
  <div id="other">
    <!--<x-header :left-options="{showBack: false}" :title='title'></x-header>-->    
    <img src="../../../static/images/head-other.jpg" class="ban_img">        
    <group  :gutter=0>
      <div class="plan-picker-wrap">
        <div class="exhibition-name">{{title}}</div>
         <cell :title='"面积方案"'  class='subTitle'>
          <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
        </cell>
        <cell primary="content" title="请选择展台面积" :value="selectedPlan.name" :is-link=true @click.native="showPlanPopupPicker = true" :arrow-direction='"down"'></cell>
        <popup-picker :show.sync="showPlanPopupPicker" :title="pickertitle"  :show-cell="false" :data="plans" ref="planpicker" @on-change="onChange"></popup-picker>
      </div>
    </group>
      <group v-if="premium.length>0" :title='"保费类型"' :gutter=6>
        <radio :options="premium" v-model=premiumType @on-change="premiumchange" ref="radioPremiu"></radio>
      </group>
  <div class="plan-detail-wrap">         
    <group label-width="10em"  v-for="(planDetail,index) in selectedPlan.planDetails" :key="index"  :gutter=10>
    <cell :title='planDetail.planTitle'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>         
        <cell v-if='false' :inline-desc='"简介 : "+planDetail.desc'></cell>
        <cell  primary="content"  v-for="(planItem,index ) in planDetail.planItems" :title="planItem.title" :key="index" :value="planItem.value" class="planItem"></cell>
    </group>
     <img src="../../../static/images/exhibition-detail.jpeg" class="ban_img">
    <flexbox :gutter="0" class="oprations">
      <flexbox-item :span="2/5" :order="1"><div class="plan-price">￥ {{planPrice.name}}</div></flexbox-item>
      <!--
      <flexbox-item  :order="2"><div class="plan-share">分享</div></flexbox-item>
      -->
      <flexbox-item  :order="3"><div class="plan-buy" @click="onConfirmPlan">立即投保</div></flexbox-item>      
    </flexbox>
    </div>
  </div>
</template>
<script>
    import exhibitData from '../../../static/js/otherData.js'
import {
  XHeader,  
  PopupPicker,
  Group,
  Cell,
  Loading,
  TransferDomDirective as TransferDom,
  Flexbox, 
  FlexboxItem,Radio,
  querystring
  } from 'vux'

export default {
  name: 'other',
  directives: {
    TransferDom
  },
  data(){
    return {
        picSrc:require('../../../static/images/icon.png'),
      /*title相关*/
      title:"展览会展馆保险",
      /*planpicker相关的数据 start*/
      showPlanPopupPicker: false,
      pickertitle:'展台面积',      
      selectedPlan:{
        name:'',
        value:'',
        planNo:'',        
        planDetail:[]
      },
      premium:[],
      premiumType:'A 单层保费',
      planPrice:{
        name:'',
        value:''
      },
      plans:exhibitData.otherData,
    }
  },
  components:{
    PopupPicker,Group,Cell,Loading,XHeader,Flexbox, FlexboxItem,Radio
  },
  methods:{
    onConfirmPlan:function(){                        
   /*     var applyurl = '/page/exhibitionapply?'+'planNo='+this.selectedPlan.planNo+'&platNo='+querystring.parse(location.search.substr(1)).platNo||'';
        applyurl=applyurl+'&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name);*/
        let  planType = querystring.parse(location.search.substr(1)).type;
        var applyurl = '/page/exhibitionapply?'+'planNo='+this.selectedPlan.planNo +'&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name)+'&planType='+planType;
        window.open(applyurl,'_self');  
    },
    onChange (val) {          
      var _value = val.toString();
      this.selectedPlan = this.plans[0].filter((plan)=>{
        return plan.value.toString() == _value;
      })[0];
      
      if(!!this.selectedPlan.price && this.selectedPlan.price instanceof Object){
        this.planPrice = this.selectedPlan.price

      }else if(!!this.selectedPlan.premium){
        this.premium = [];
        this.premiumType = '';
        this.planPrice = {name:"",value:""};
        this.premium = this.selectedPlan.premium
        //设置默认
        
        this.$nextTick(function(){
          var radior = this.$refs.radioPremiu;
          if(radior){
            radior.currentValue = this.premium[0].key;
          }          
        })
      }            
    },
    premiumchange(value, label){      
      if(!!value){        
        this.planPrice = this.premium.filter((p)=>{
          return p.key == value;
      })[0].price
      }else{
        this.planPrice = {name:"",value:""};
      }      
      
    }
  },
  created(){},
  mounted(){
     this.selectedPlan = this.plans[0][0];
      if(!!this.selectedPlan.price && this.selectedPlan.price instanceof Object){
        this.planPrice = this.selectedPlan.price
      }      
      if(!!this.selectedPlan.premium){        
        this.premium = this.selectedPlan.premium;
      }else{
        this.premium = [];
      }  
  }
}
</script>

<style lang="scss">
@function r($px){
  @return $px /2/18.75 * 1rem;
}
$OperatorHeight:3rem;
$otherFontSize:1rem;
$BaseFontSize:0.9rem;
$baseColor:#ff4200;
$lineheight:1.5rem;
#other{
  .vux-label{line-height:$lineheight;font-size:$BaseFontSize  }
  padding-bottom: $OperatorHeight;
    .weui-cells{
    font-size: $BaseFontSize;
  }
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
/*  .plan-detail-wrap{
    .vux-label-desc{
      font-size: $BaseFontSize;
    }
    .vux-label{
      font-size: $BaseFontSize;
      line-height:  $lineheight;
    }
    .vux-cell-primary {
      font-size: $BaseFontSize;
    }
  }*/
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
}

</style>
