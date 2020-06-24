<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="toggleList">
            <div class="logo" :class="{'have-count': totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div v-show="totalCount>0" class="num">{{totalCount}}</div>
          </div>

          <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPri}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="playClass">{{payDesc}}</div>
        </div>
      </div>
      <!-- 购物车详情页 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <div class="title">购物车</div>
            <div class="empty" @click="clearCart">清空</div>
          </div>
          <div class="list-content" ref="shoopList">
            <ul>
              <li v-for="(food, index) in selectFoods" :key="index" class="food">
                <div>
                  <span class="name">{{food.name}}</span>
                  <div class="cartcontrol-wrapper">
                    <CartControl
                      :food="food"
                    ></CartControl>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="cart-background">
      <div class="list-mask" v-show="isShowList" @click="hiddenList">
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import CartControl from 'components/cartcontrol/cartcontrol.vue'
import BScroll from '@better-scroll/core'

export default {
  data() {
    return {
      isShowList: false
    }
  },
  props: {
    // 配送费
    deliveryPri: {
      type: Number
    },
    // 最少价格
    minPri: {
      type: Number
    },
    // 选择的food
    selectFoods: {
      type: Array
      // default: function () {
      //   return [{
      //     price: 10,
      //     count: 1
      //   }, {
      //     price: 9.9,
      //     count: 2
      //   }]
      // }
    }
  },
  computed: {
    totalPrice: function () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount: function () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc: function() {
      if (this.totalPrice === 0) {
        return `￥${this.minPri}元起送`
      } else if (this.totalPrice < this.minPri) {
        let diff = this.minPri - this.totalPrice
        return `还差￥${diff.toFixed(2)}元起送`
      } else {
        return `结算`
      }
    },
    playClass: function () {
      if (this.totalPrice >= this.minPri) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    listShow: function () {
      if (!this.totalCount) {
        this.falseListShow()
        return false
      }
      let show = this.isShowList
      if (show) {
        this.cartScroll()
      }
      return show
    }
  },
  methods: {
    toggleList: function () {
      if (!this.totalCount) {
        return
      }
      this.isShowList = !this.isShowList
    },
    falseListShow: function() {
      this.isShowList = false
    },
    cartScroll: function() {
      // hasVerticalScroll和scrollerHeight
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.shoopList, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
        // console.log(this.scroll.hasVerticalScroll)
        // console.log(this.scroll.scrollerHeight)
      })
    },
    clearCart: function () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hiddenList: function() {
      this.isShowList = false
    },
    pay: function() {
      if (this.totalPrice < this.minPri) {
        return 1
      }
      window.alert(`支付${this.totalPrice}元`)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      position: relative
      width: 100%
      height: 100%
      color: rgba(255, 255, 255, .4)
      background: #141d27
      font-size: 0
      z-index: 51
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: absolute
          top: -10px
          box-sizing: border-box
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          vertical-align: top
          border-radius: 50%
          background: #141d27
          z-index: 51
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: #2b343c
            &.have-count
              background: rgb(0, 160, 220)
              .icon-shopping_cart
                color: rgb(255, 255, 255)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: rgb(128,133,138)
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          font-size: 9px
          border-radius: 6px
          color: rgb(255, 255, 255)
          background-color: rgb(240, 20, 20)
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          margin-left: 80px
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          line-height: 24px
          box-sizing: border-box
          color: rgba(255, 255, 255, .4)
          border-right: 1px solid rgba(255, 255, 255, .1)
          &.highlight
            color: rgb(255, 255, 255)
        .desc
          display: inline-block
          margin-left: 12px
          font-size: 12px
          line-height: 48px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          font-size: 12px
          line-height: 48px
          text-align: center
        .not-enough
          background: rgb(43,51,59)
        .enough
          background: rgb(36,198,68)
          color: rgb(255, 255, 255)
    .shopcart-list
      position: absolute
      bottom: 48px
      width: 100%
      background: #ccc
      z-index: 49
      &.fold-enter-active
        transition: all 0.5s linear
        transform: translate3d(0,0,0)
      &.fold-leave-active
        transition: all 0.5s linear
        transform: translate3d(0,100%,0)
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0,100%,0)
      .list-header
        padding: 0 18px
        height: 40px
        line-height: 40px
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        background: #f3f5f7
        .title
          display: inline-block
          float: left
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .empty
          display: inline-block
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        background-color: rgb(255, 255, 255)
        max-height: 241px
        overflow: hidden
        .food
          position: relative
          padding: 12px 18px
          height: 48px
          border-bottom: 1px solid rgba(7, 17, 27, .1)
          box-sizing: border-box
          // .slide-enter-active
          //   transition: all 0.5s linear
          // .slide-leave-active
          //   transition: all 0.5s linear
          // .slide-enter, .slide-leave-to
          //   transform: translateX(30px)
          .name
            float: left
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            display: inline-block
            float: right
            margin: 0 12px 0 18px
            font-size: 14px
            line-height: 24px
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            display: inline-block
            float: right
            margin-top: -5px
      // .shopcart-background
      //   position: absolute
      //   top : 0
      //   left: 0
      //   width: 100%
      //   height: 100%
      //   background: rgb(7, 17, 27, .6)
      //   filter: blur(10px)
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40px
    background: rgba(7, 17, 27, .6)
    backdrop-filter: blur(10px)
    &.cart-background-enter-active
      transition: all 0.5s
      background: rgba(7, 17, 27, 0.6)
    &.cart-background-leave-active
      transition: all 0.5s
      background: rgba(7, 17, 27, 0)
    &.cart-background-enter
      background: rgba(7, 17, 27, 0)
    &.cart-background-leave
      background: rgba(7, 17, 27, 0.6)
</style>
