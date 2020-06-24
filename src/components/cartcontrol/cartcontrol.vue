<template>
  <div class="cartcontrol">
    <transition :duration="1000" name="cart-slide">
      <div class="left-cart" v-show="food.count > 0">
        <div
          class="cart-decrease icon-remove_circle_outline"
          @click="reduceCart"
        >
        </div>
        <div
          class="cart-count"
        >
          {{food.count}}
        </div>
      </div>
    </transition>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: Object
  },
  methods: {
    addCart: function (event) {
      // 不是自己派生的不要触发
      // if (!event._constructed) {
      //   return
      // }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    reduceCart: function (event) {
      // 不是自己派生的不要触发
      // if (!event._constructed) {
      //   return
      // }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .left-cart
      display: inline-block
      &.cart-slide-enter-active
        transition: all .6s ease
        opacity: 1
      &.cart-slide-leave-active
        transition: all .6s ease
        opacity: 0
        transform: rotate(0)
      &.cart-slide-enter, .cart-slide-leave-to
        transform: translateX(24px)
        opacity: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display: inline-block
      vertical-align: top
      padding-top: 6px
      width: 24px
      font-size: 10px
      line-height: 24px
      text-align: center
      color: rgb(147, 153, 159)
</style>
