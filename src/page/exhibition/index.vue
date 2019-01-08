<template>
  <div id="app">
      <div v-transfer-dom>
        <loading :show="isshowloading" :text="'加载中...'"></loading>
      </div>  
      <carOutDoor v-if="planType==='1'"></carOutDoor>
      <carInDoor v-if="planType==='2'"></carInDoor>
      <shubo v-if="planType==='3'"></shubo>
      <other v-if="planType==='4'"></other>
      <chezhan v-if="planType==='5'"></chezhan>
  </div>
</template>
<script>

import carOutDoor from './caroutdoor'
import carInDoor from './carindoor'
import shubo from './shubo'
import other from './other'
import chezhan from './chezhan'

import{
    Loading,
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
        isshowloading:false,
        planType:0
    }
  },
  components:{carOutDoor,carInDoor,other,shubo,Loading,chezhan},

  created(){
  },
  mounted(){      
    var url = location.search; 
    this.planType = querystring.parse(url.substr(1)).type;
      
    if(["1","2","3","4","5"].indexOf(this.planType) < 0){
      this.isshowloading = true;
    }
  }
}
</script>

<style lang="scss">
#app{
}
</style>
