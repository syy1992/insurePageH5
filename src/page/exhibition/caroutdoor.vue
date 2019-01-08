<template>
  <div id="car-out-door">
    <!--<x-header :left-options="{showBack: false}" :title='title'></x-header>-->
    <img src="../../../static/images/head-car.jpg" class="ban_img">   

  <div class="plan-detail-wrap">
    <group  :title='""' :gutter=0>
        <div class="exhibition-name">{{title}}</div>
        <cell :title='"面积方案"'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>            
        <cell primary="content" title="面积大小" :value="selectedPlan.name"></cell>              
    </group>         
    <group label-width="10em" v-for="(planDetail,index) in planDetails"  :key="index" :gutter=10>
        <cell :title='planDetail.planTitle'  class='subTitle'>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="picSrc">
      </cell>         
        <cell v-if='false' :inline-desc='"简介 : "+planDetail.desc'></cell>
        <cell  primary="content"  v-for="(planItem,index) in planDetail.planItems" :title="planItem.title" :key="index" :value="planItem.value" class="planItem"></cell>
    </group>
    <img src="../../../static/images/exhibition-detail.jpeg" class="ban_img">
    <flexbox :gutter="0" class="oprations">        
      <flexbox-item :span="2/5" :order="1"><div class="plan-price">￥ {{planPrice.name}}</div></flexbox-item>      
      <flexbox-item  :order="3"><div class="plan-buy" @click="onConfirmPlan">立即投保</div></flexbox-item>           
    </flexbox>
    </div>
  </div>
</template>
<script>

import {
  XHeader,
  XButton  ,
  PopupPicker,
  Group,
  Cell,
  Loading,
  TransferDomDirective as TransferDom,
  Flexbox,
  querystring, 
  FlexboxItem
  } from 'vux'

export default {
  name: 'caroutdoor',
  directives: {
    TransferDom
  },
  data(){
    return {
        picSrc:require('../../../static/images/icon.png'),
        title: '车展展会保险--馆外方案',
        planPrice: { name: '1200.00 元', value: 1200 },        
        selectedPlan: {
            name:"100 ㎡ （含）以下",
            value:1            
        },
        planDetails: [{
                planTitle: "展览会责任险",
                desc: "雇请工作人员责任、第三者责任、所租用展览场所的建筑物、各类设备及地面、地基的损失责任",
                planItems: [{
                        title: "每人赔偿限额",
                        value: '100万',
                    },
                    {
                        title: "每次事故赔偿限额",
                        value: '100万',
                    },
                    {
                        title: "免赔额 ",
                        value: '每次事故损失金额的 200 元或 5%，两者以高者为准',
                    }
                ]
            },
            {
                planTitle: "安装工程一切险",
                desc: '',
                planItems: [{
                        title: "物质损失部分赔偿限额",
                        value: "50 万"
                    },
                    {
                        title: "免赔额",
                        value: "每次事故损失金额的 1000 元或 5%，两者以高者为准"
                    }
                ]
            }
        ]
    }
  },
  components:{
    PopupPicker,Group,Cell,Loading,XHeader,Flexbox, FlexboxItem
  },
  methods:{
      onConfirmPlan:function(){
        let  planType = querystring.parse(location.search.substr(1)).type;
        console.log('planType='+planType)
        var applyurl = '/page/exhibitionapply?planNo=JHOFFLCAROUT01&planprice='+encodeURIComponent(this.planPrice.name)+'&planinfo='+encodeURIComponent(this.selectedPlan.name)+'&planType='+planType;
        window.open(applyurl,'_self');
      }
  },
  created(){
    
  },
  mounted(){
     
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
#car-out-door{
  padding-bottom: $OperatorHeight;
    .vux-label{
        line-height:$lineheight;
        $BaseFontSize:0.9rem;
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
      color: #ff4200;      
      line-height: $OperatorHeight;
    }
    .plan-share{      
      background-color: #ffb938;      
      letter-spacing: 0.01rem;
    }
    .plan-buy{
                    
      background-color: #ff4200;    
      letter-spacing: 0.01rem;
    }
  }
  .plan-picker-wrap{
    .vux-cell-primary {
      color: #ff4200;
      font-size: $BaseFontSize;    
    }
    .vux-cell-arrow-down{
      &:after{
        color: #ff4200;
      }
    }
  }
  .plan-detail-wrap{
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
