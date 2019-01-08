<template>
  <div id="app">
      <detail></detail>
  </div>
</template>
<script>

import detail from './xiaobaoDetail'

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
        salesNo:0
    }
  },
  components:{detail,Loading},
  created(){},
  mounted(){
      let url = location.search;
      this.salesNo = querystring.parse(url.substr(1)).salesNo;
}
}
</script>
<style lang="scss">
#app{
}
</style>
