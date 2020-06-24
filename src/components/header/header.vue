<template>
  <div class="header">
    <div class="content-wrapper">
      <!-- 头像区 -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <!-- 内容区 -->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>

        <div v-if="seller.supports" class="support">
          <!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
          <Icon
              :itemType = "seller.supports[0].type"
              :size = "12"
            ></Icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <li class="icon-keyboard_arrow_right"></li>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <li class="icon-keyboard_arrow_right"></li>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!-- 详情区域 -->
    <transition name="slide-fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <Star
            :size="48"
            :score="seller.score"
            class="star-wrapper"
          ></Star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
            <!-- <span class="icon" :class="classMap[item.type]"></span> -->
            <Icon
              :itemType = "item.type"
              :size = "16"
            ></Icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div v-if="seller.bulletin" class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
          </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="hiddenDetail"></i>
      </div>
    </div>
  </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star.vue'
import Icon from 'components/icon/icon.vue'

export default {
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail: function() {
      this.detailShow = true
    },
    hiddenDetail: function() {
      this.detailShow = false
    }
  },
  props: {
    seller: Object
  },
  components: {
    Star,
    Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/mixin.styl'

  .header
    position: relative
    overflow: hidden
    color: #fff
    background-color: rgba(7, 17, 27, .5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            // 顶部对齐
            vertical-align: top
            width: 30px
            height: 18px
            bg-image("brand")
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-top: 8px
          font size 24px
          line-height: 24px
        .support
          vertical-align: top
          .text
            display: inline-block
            vertical-align: top
            height: 12px
            line-height: 12px
            font-size: 10px
      .support-count
        position:absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 16px
        background: rgba(0, 0, 0, .2)
        text-align: center
        .count
          font-size: 10px
          line-height: 24px
        .icon-keyboard_arrow_right
          display: inline-block
          margin-left: 2px
          font-size: 10px
          line-height: 24px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px;
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis //超出的以...显示
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        font-size: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      height: 100%
      width: 100%
      z-index: -1
      filter: blur(10px)  //背景图虚化
    .slide-fade-enter-active
        transition: all .3s ease
        background: rgba(7, 17, 27, .8)
    .slide-fade-leave-active
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      background: rgba(7, 17, 27, .8)
    .slide-fade-enter, .slide-fade-leave-to
      transform: translateX(10px)
      background: rgba(7, 17, 27, 0.8)
      opacity: 0
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: hidden
      z-index: 100
      background: rgba(7, 17, 27, .8)
      backdrop-filter: blur(10px)   //背景虛化
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 28px
          .name
            text-align: center
            font-size: 16px
            font-weight: 700
            line-height: 16px
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, .2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .text
              vertical-align: middle
              height: 16px
              font-size: 12px
              font-weight: 200
              line-height: 16px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            font-size: 12px
            font-weight: 200
            line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0
        clear: both
        font-size: 32px

</style>
