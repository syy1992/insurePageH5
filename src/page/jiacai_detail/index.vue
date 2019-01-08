<template>
  <div id="app">
      <!--<div v-transfer-dom>-->
        <!--<loading :show="isshowloading" :text="'加载中...'"></loading>-->
      <!--</div>  -->
      <detail></detail>
  </div>
</template>
<script>
import detail from './jiacaiDetail'

import{
//    Loading,
    TransferDomDirective as TransferDom,
    querystring
}  from 'vux'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  data(){
    return {
//        isshowloading:false,
        planType:0
    }
  },
  components:{detail},
  created(){
  },
  mounted(){      
  }
}
</script>

<style lang="scss">
#app{
}

</style>
