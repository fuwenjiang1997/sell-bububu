<template>
<div v-show="showFlag" class="food" ref="foodWepper">
  <div class="food-content">
    <div class="desc-img-swapper">
      <img :src="food.image" alt="">
      <div class="back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
    </div>
    <div class="content">
      <h2 class="name">{{food.name}}</h2>
      <div class="extra">
        <span class="count">月售{{food.sellCount}}份</span>
        <span>好评率{{food.rating}}</span>
      </div>
      <div class="price">
        <span class="new-price">￥{{food.price}}</span>
        <span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
      </div>
      <!-- 加入购物车，增加减少控件 -->
      <div class="control-swepper">
        <div v-if="!this.food.count" class="cart-control" @click="addcart">加入购物车</div>
        <CartControl v-else :food="this.food"></CartControl>
      </div>
    </div>
    <SpliceLine />
    <div v-show="this.food.info" class="desc">
      <span class="detail-name">商品介绍</span>
      <span class="detail-content">{{this.food.info}}</span>
    </div>
    <SpliceLine v-show="this.food.info" />
    <div class="rating">
      <h1 class="title">商品评价</h1>
      <Ratingselect
        @select="selectRating"
        @toggle="toggleContent"
        :ratings="food.ratings"
        :select-type="selectType"
        :only-content="onlyContent"
        :desc="desc"
        class="ratingselect"
      ></Ratingselect>
    </div>
    <div class="list-ratings">
      <ul v-show="food.ratings && food.ratings.length">
        <li
          v-for="(rating, index) in food.ratings"
          v-show="needShow(rating.rateType, rating.text)"
          :key="index"
          class="rating-item"
        >
          <span class="date item">{{rating.rateTime | formatDate}}</span>
          <span class="avatar"><img width="12px" height="12px" :src="rating.avatar" alt=""></span>
          <span class="user-name item">{{rating.username}}</span>
          <p class="">
            <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
            <span class="rating-content">{{rating.text}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import CartControl from 'components/cartcontrol/cartcontrol.vue'
import SpliceLine from 'components/spliceline/spliceline.vue'
import Ratingselect from 'components/ratingselect/ratingselect.vue'
import { formatDate } from 'common/js/date'
import Vue from 'vue'
import BScroll from '@better-scroll/core'
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props: {
    food: Object
  },
  methods: {
    show: function() {
      this.showFlag = true
      this.selectType = ALL
      // 只看有内容的
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.foodWepper, {
            click: true
          })
        } else {
          this.foodScroll.refresh()
        }
      })
    },
    hide: function () {
      this.showFlag = false
    },
    addcart: function () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }
    },
    stempToDate: function(stemp) {
      let date = new Date(stemp)
      return date
    },
    selectRating: function(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.foodScroll.refresh()
      })
    },
    needShow: function (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    toggleContent: function () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.foodScroll.refresh()
      })
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    CartControl,
    SpliceLine,
    Ratingselect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background-color: rgb(255, 255, 255)
    overflow: hidden
    .desc-img-swapper
      position: relative
      height: 375px
      width: 100%
      img
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .name
        font-size: 14px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .extra
        margin-top: 18px
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 10px
        .count
          margin-right: 12px
      .price
        margin-top: 18px
        font-size: 10px
        .new-price
          font-size: 14px
          line-height: 24px
          font-weight: 700
          color: rgb(240, 20, 20)
        .old-price
          line-height: 24px
          color: rgb(147, 153, 159)
          text-decoration: line-through
      .control-swepper
        position: absolute
        bottom: 18px
        right: 18px
        .cart-control
          box-sizing: border-box
          padding: 0 6px
          height: 24px
          line-height: 24px
          font-size: 10px
          text-align: center
          border-radius: 12px 12px
          color: rgb(255, 255, 255)
          background: rgb(0, 160, 220)
    .desc
      padding: 18px
      .detail-name
        display: block
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .detail-content
        font-size: 12px
        line-height: 24px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding: 18px 18px 0
      border-bottom: 1px solid rgb(147, 153, 159)
      .name
        font-size: 14px
        font-weight: 300
        color(7, 17, 27)
        line-height: 14px
      .ratingselect
        margin-top: 18px
    .list-ratings
      margin:16px
      .rating-item
        margin-top: 16px
        padding-bottom: 16px
        border-1px(rgb(147, 153, 159))
        .icon-thumb_up
          font-size: 12px
          color: rgb(0, 160, 220)
          line-height: 24px
        .icon-thumb_down
          font-size: 12px
          color: rgb(147, 153, 159)
          line-height: 24px
      .item
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 12px
      .avatar
        display: inline-block
        float: right
        margin-left: 6px
        width: 12px
        height: 12px
        border-radius: 6px
        overflow: hidden
      .user-name
        display: inline-block
        float: right
      .rating-content
        display: inline-block
        margin-left: 4px
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 16px
</style>
