<template>
    <div id="detail">
        <img src="../../../static/images/jiacai_banner_b.jpg" class="ban_img">
        <group :gutter=0>
            <div class="plan-picker-wrap">
                <cell primary="content" title="选择保障方案" :value="selectedPlan.name" :is-link=true @click.native="showPlanPopupPicker = true" :arrow-direction='"down"' class='select'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
                <popup-picker :show.sync="showPlanPopupPicker" :title="pickertitle" :show-cell="false" :data="plans" ref="planpicker" @on-change="onChange" ></popup-picker>
            </div>
        </group>

        <div class="plan-detail-wrap">
            <div class="back-top" @click="backTop">
                <img src="../../../static/images/top.png">
            </div>
            <group v-for="(planDetail,index) in selectedPlan.planDetails"  :gutter=10 :key='index'>
                <cell primary="content"  title="财产一切险" v-for="(planItem,index) in planDetail.planItems1" :title="planItem.title" :value="planItem.value" :key='index' class="planItem">
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
            </group>
            <group v-for="(planDetail,index) in selectedPlan.planDetails"  :gutter=10 :key='index' style='margin-bottom: 10px;'>
                <cell :title='"公众责任保险"'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
                <cell v-for="(planItem,index) in planDetail.planItems" :title="planItem.title" :value="planItem.value" :key='index' class="planItem"></cell>
            </group>
            <group v-for="(planDetail,index) in selectedPlan.planDetails"  :gutter=10 :key='index'>
                <cell :title='"雇主责任保险"'>
                    <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../../static/images/icon.png">
                </cell>
                <cell v-for="(planItem,index) in planDetail.planItems2" :title="planItem.title" :value="planItem.value" :key='index' class="planItem"></cell>
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
                <img src="../../../static/images/jiacai_detail_b.jpg" class='detail_img'>
            </group>

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

    </div>
</template>

<script>
    import {
        PopupPicker,
        Group,
        Cell,
        Loading,
        TransferDomDirective as TransferDom,
        Flexbox,
        FlexboxItem, Radio,CheckIcon,
        Grid, GridItem,
        Divider,
        Popup,  XButton,
    } from 'vux'

    export default {
        name: 'detail',
        directives: {
            TransferDom
        },
        data() {
            return {
                textVal: '财产损失100元或损失金额10%，以高者为准；人伤无免赔',
                period: '一年',
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
                planPrice: {
                    name: '',
                    value: ''
                },
                plans: [
                    [
                        {
                            name: "方案A",
                            value: 1,
                            planNo:'JHSSPIMGAS0001',
                            price: {
                                name: '1000.00',
                                value: 1000
                            },
                            planDetails: [
                                {
                                    planTitle: "家财险",
                                    desc: "昆仑燃气项目保险方案",
                                    planItems: [
                                        {
                                            title: "累计责任限额",
                                            value: '20万',
                                        },
                                        {
                                            title: "每人责任限额",
                                            value: '1万',
                                        },
                                    ],
                                    planItems1: [
                                        {
                                            title: "财产一切险",
                                            value: '50万',
                                        },
                                    ],
                                    planItems2: [
                                        {
                                            title: "累计赔偿限额",
                                            value: '300万',
                                        },
                                        {
                                            title: "每人身故/残疾/烧烫伤保险金额",
                                            value: '10万',
                                        },
                                        {
                                            title: "每人医疗费用保险金额",
                                            value: '5万',
                                        },

                                    ],
                                },
                            ]
                        },
                        {
                            name: "方案B",
                            value: 2,
                            planNo:'JHSSPIMGAS0002',
                            price: {
                                name: '2000.00',
                                value: 2000
                            },
                            planDetails: [{
                                planTitle: "家财险",
                                desc: "昆仑燃气项目保险方案",
                                planItems: [
                                    {
                                        title: "累计责任限额",
                                        value: '40万',
                                    },
                                    {
                                        title: "每人责任限额",
                                        value: '1万',
                                    },
                                ],
                                planItems1: [
                                    {
                                        title: "财产一切险",
                                        value: '80万',
                                    },

                                ],
                                planItems2: [
                                    {
                                        title: "累计赔偿限额",
                                        value: '500万',
                                    },
                                    {
                                        title: "每人身故/残疾/烧烫伤保险金额",
                                        value: '10万',
                                    },
                                    {
                                        title: "每人医疗费用保险金额",
                                        value: '8万',
                                    },

                                ],
                            },
                            ]
                        },
                        {
                            name: "方案C",
                            value: 3,
                            planNo:'JHSSPIMGAS0003',
                            price: {
                                name: '5000.00',
                                value: 5000
                            },
                            planDetails: [{
                                planTitle: "家财险",
                                desc: "",
                                planItems: [
                                    {
                                        title: "累计责任限额",
                                        value: '200万',
                                    },
                                    {
                                        title: "每人责任限额",
                                        value: '2万',
                                    },
                                ],
                                planItems1: [
                                    {
                                        title: "财产一切险",
                                        value: '300万',
                                    },
                                ],
                                planItems2: [
                                    {
                                        title: "累计赔偿限额",
                                        value: '800万',
                                    },
                                    {
                                        title: "每人身故/残疾/烧烫伤保险金额",
                                        value: '10万',
                                    },
                                    {
                                        title: "每人医疗费用保险金额",
                                        value: '10万',
                                    },

                                ],
                            },
                            ]
                        },
                        {
                            name: "方案D",
                            value: 4,
                            planNo:'JHSSPIMGAS0004',
                            price: {
                                name: '10000.00',
                                value: 10000
                            },
                            planDetails: [{
                                planTitle: "家财险",
                                desc: "",
                                planItems: [
                                    {
                                        title: "累计责任限额",
                                        value: '500万',
                                    },
                                    {
                                        title: "每人责任限额",
                                        value: '5万',
                                    },
                                ],
                                planItems1: [
                                    {
                                        title: "财产一切险",
                                        value: '500万',
                                    },
                                ],
                                planItems2: [
                                    {
                                        title: "累计赔偿限额",
                                        value: '1000万',
                                    },
                                    {
                                        title: "每人身故/残疾/烧烫伤保险金额",
                                        value: '10万',
                                    },
                                    {
                                        title: "每人医疗费用保险金额",
                                        value: '10万',
                                    },

                                ],
                            },
                            ]
                        },
                        {
                            name: "方案E",
                            value: 5,
                            planNo:'JHSSPIMGAS0005',
                            price: {
                                name: '20000.00',
                                value: 20000
                            },
                            planDetails: [{
                                planTitle: "家财险",
                                desc: "",
                                planItems: [
                                    {
                                        title: "累计责任限额",
                                        value: '1000万',
                                    },
                                    {
                                        title: "每人责任限额",
                                        value: '10万',
                                    },
                                ],
                                planItems1: [
                                    {
                                        title: "财产一切险",
                                        value: '1700万',
                                    },
                                ],
                                planItems2: [
                                    {
                                        title: "累计赔偿限额",
                                        value: '1500万',
                                    },
                                    {
                                        title: "每人身故/残疾/烧烫伤保险金额",
                                        value: '10万',
                                    },
                                    {
                                        title: "每人医疗费用保险金额",
                                        value: '10万',
                                    },

                                ],
                            },
                            ]
                        },
                    ]
                ],
                /*planpicker相关的数据 end*/
            }
        },
        components: {
            PopupPicker, Group, Cell, Loading,  Flexbox, FlexboxItem, Radio,CheckIcon,
            Grid, GridItem,
            Divider,
            Popup,  XButton,
        },
        methods: {
            onConfirmPlan: function () {
                var applyurl = '/insure?planNo='+encodeURIComponent(this.selectedPlan.planNo)+'&planPrice='+encodeURIComponent(this.planPrice.name)+'&planInfo='+encodeURIComponent(this.selectedPlan.name);
                this.$router.push({path:applyurl})
            },
            //选择的方案变更
            onChange(val) {
                //选择的方案已改变，需要刷新，重新根据选择的方案确定要显示的数据
               this.refreshShowPlan()
                this.refreshShowPrice()
            },
             //计算总价
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
                if(!this.$refs.planpicker.currentValue[0]){
                    return null;
                }
                let curPlanValue= this.$refs.planpicker.currentValue[0].toString();  //当前选中plan的value值
                let curPlan=this.plans[0].filter((plan) => {
                    //filter查找对应当前所选value的plan
                    return plan.value.toString() == curPlanValue;
                })[0];
                return curPlan;
            },
            backTop:function(){
                document.body.scrollTop = 0;
            },
        },
        created() {},
        mounted() {
            //初始选中第一个方案，即this.plans[0]下第0个元素
//            this.$refs.planpicker.currentValue=[this.plans[0][0].value]
            this.$refs.planpicker.currentValue=[this.plans[0][0].value];// B方案
            this.refreshShowPlan();
            this.refreshShowPrice();
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
    $BaseLineHeight: 1.9rem;
    $buttonFontSize: 1rem;
    $BaseColor: #232323;
    $orangeColor: #FC9020;
    $halfBlackColor: #8c8c8c;
    #detail {
        padding-bottom: $OperatorHeight;
        .ban_img {
            width: 100%;
            /*height: 9rem;*/
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
                font: normal $buttonFontSize normal;
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
                line-height: 1.9rem;
                font-size: $BaseFontSize;
            }
            .vux-cell-arrow-down {
                &:after {
                    color: $orangeColor;
                }
            }
            .vux-label {
                font-size: $BaseFontSize;
                color:$BaseColor;
                line-height: 1.9rem;
            }
        }
        .plan-detail-wrap {
            /*margin-bottom: 2rem;*/
            .vux-label-desc {
                font-size: $BaseFontSize;
            }
            .vux-label {
                font-size: $BaseFontSize;
                color:$BaseColor;
                line-height: 1.9rem;
            }
            .vux-cell-primary {
                font-size: $BaseFontSize;
            }
        }
    }

    #detail .plan-picker-wrap .vux-cell-arrow-down:after {
        /*border-color: #FC9020;*/
        margin-top: -6px;
    }
   #detail .plan-picker-wrap .vux-cell-arrow-down:after {
       /*border-color: #FC9020;*/
       margin-top: -6px;
   }
    #detail .vux-label{
        font-size: $BaseFontSize;
        margin-right: 20px;
    }
    #detail .vux-radio-label{
        font-size: $BaseFontSize;
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
       .weui-cell{line-height: $BaseLineHeight;&:before{right:15px}}
       .weui-cells:after{
           &:before{display: none;};
           &:after{display: none;}
       }
   }
   /*#detail .weui-cell {*/
       /*padding: 13px 15px;*/
   /*}*/
   /*#detail .weui-cell:before{;}*/
   /*#detail  .weui-icon-circle:before {*/
       /*!*content: "\EA01";*!*/
       /*content: "\2714";*/
   /*}*/
   .flex-demo {
       text-align: left;
       color: #000;
       background-color: #fff;
       background-clip: padding-box;
       line-height: 50px;
       padding: 0 15px;
       font-weight: 600;
       font-size: $buttonFontSize;
   }
   .grid-center {
       display: block;
       text-align: center;
       color: #666;
   }
   .weui-grids {
       background-color: #fff;
       margin: 10px 0;
   }
   #detail .weui-grid {
       padding: 10px 10px
   }
    #detail .weui-panel__hd:after{display: none;}
   #detail .weui-panel__hd {
       padding: 14px 15px 5px;
       color: #666;
   }
   #detail{
       .weui-cell__ft{
           font-size:$BaseFontSize;
           color:$halfBlackColor;
       }
   }
   #detail{
      .select{
          .weui-cell__ft{
              font-size:$BaseFontSize;
              color:$orangeColor;
              /*color:#68a6f5;*/
          }
      }
   }
   #detail{
       .weui-grid__label{
           font-size:$BaseFontSize;
           color:$BaseColor;
       }
   }
   #detail .s-insurance::before{font-size: 15px;content: "\e6c6";}
   #detail .s-insurance {
       margin-right: 0.2rem;
       vertical-align: middle;
       display: inline-block;
       /*position: relative;*/
   }
   #detail .vux-no-group-title{margin-top: 30px;}
   /*#detail  .weui-cells{margin-top: 30px;}*/
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
   #detail .vux-popup-dialog{background: #fff}
   /*#detail .vux-popup-header .vux-popup-header-right{color: #353535}*/
    /*.divstyle{*/
        /*font-size:0.7rem;text-align: left;padding: 5px 15px;line-height: 1.3rem;color: #666;*/
    /*}*/
    /*.pstyle{line-height: 24px;font-size: 0.9rem;margin-bottom: 0.3rem;color: #353535}*/
    /*.link{background: #eee;font-size:0.72rem; }*/

   .v-transfer-dom{
       .vux-popup-header-right{
           color:$orangeColor;
       }
   }
   .v-transfer-dom{
        .vux-popup-dialog{
            /*background: #fff;*/
            .weui-cells{margin-top:30px}
            #Layer_1{position: absolute;right: 15px;}

        }
    }
   .back-top{
       border: 2px solid #bfbfbf;
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
</style>
