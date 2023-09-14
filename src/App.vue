<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from 'components/header/header.vue'
import { urlParse } from 'common/js/util.js'
import staticData from '../static/data.json'
const ERR_OK = 0

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    // this.$http.get('http://selladmin.bfclouds.cn/seller.php?id=' + this.seller.id, {}, { emulateJSON: true }).then((res) => {
    //   res = res.body
    //   if (res.errno === ERR_OK) {
    //     // 将获取的数据与现有的seller已有的id结合成新对象
    //     this.seller = Object.assign({}, this.seller, res.data)
    //   }
    // }).catch((res) => {
    //   this.seller = {}
    // })
    this.seller = staticData.seller
  },
  components: {
    Header: header
  }
}
</script>

<style lang="stylus">
@import 'common/stylus/index.styl'

  #app
    .tab
      display: flex
      width : 100%
      height : 40px
      line-height : 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex : 1
        text-align : center
        & > a
          display : block
          font-size: 14px;
          color : rgb(77, 85, 93)
        & .active
            color: rgb(240, 20, 20)
</style>
