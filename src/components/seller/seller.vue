<template>
<div class="seller" ref="sellerScroll">
  <div class="content">
    <div class="overview">
      <h1 class="name">{{seller.name}}</h1>
      <div class="desc">
        <Star :size=36 :score="seller.score" class="star" />
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite">
        <span class="icon-favorite" :class="{'active':favorite}"></span>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>
    <SpliceLine />
    <div class="bulletin">
      <h1 class="name">公告与活动</h1>
      <div class="content-wepper border-1px">
        <span class="content">{{seller.bulletin}}</span>
      </div>
      <ul v-show="seller.supports" class="supports">
          <li v-for="(support, index) in seller.supports" :key="index" class="support-item">
            <Icon :itemType="support.type" :size=316 class="icon" />
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
    </div>
    <SpliceLine />
    <div class="pics">
      <h1 class="name">商家实景</h1>
      <div class="content" ref="picScroll">
        <ul class="pic-list" ref="picList">
          <li v-for="(pic, index) in seller.pics" :key="index" class="pic-item">
            <img :src="pic" alt="" width="120" height="90">
          </li>
        </ul>
      </div>
    </div>
    <SpliceLine />
    <div class="info">
      <h1 class="name">商家信息</h1>
      <ul>
        <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import SpliceLine from 'components/spliceline/spliceline.vue'
import Icon from 'components/icon/icon.vue'
import { saveToLocal, loadFromLocal } from 'common/js/store.js'
import BScroll from '@better-scroll/core'
// loadFromLocal
export default {
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  props: {
    seller: Object
  },
  methods: {
    toggleFavorite: function () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    _initScroll: function () {
      if (!this.sellerScroll) {
        this.sellerScroll = new BScroll(this.$refs.sellerScroll, {
          click: true
        })
      } else {
        this.sellerScroll.refresh()
      }
    },
    _initPics: function () {
      if (this.seller.pics) {
        let picWidth = 120
        let marWidth = 6
        let width = (picWidth + marWidth) * this.seller.pics.length - marWidth
        this.$refs.picList.style.width = width + 'px'
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.picScroll, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      }
    }
  },
  watch: {
    seller: function() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  computed: {
    favoriteText: function () {
      return this.favorite ? '已收藏' : '未收藏'
    }
  },
  created() {
    loadFromLocal(this.seller.id, 'favorite', false)
  },
  components: {
    Star,
    SpliceLine,
    Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/mixin.styl"

  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .content
      .overview
        position: relative
        padding: 18px
        .name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .desc
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 0
          .star
            display: inline-block
            margin-right: 8px
            vertical-align: top
          .text
            display: inline-block
            margin-right: 12px
            font-size: 10px
            vertical-align: top
            line-height: 18px
            color: rgb(77, 85, 93)
        .remark
          display: flex
          text-align: center
          padding-top: 18px
          .block
            flex: 1
            list-style: none
            &.block:not(:last-child)
              border-right: 1px solid rgba(7, 17, 27, 0.1)
            h2
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
            .content
              margin-top: 4px
              .stress
                font-size: 24px
                font-weight: 200
                line-height: 24px
                color: rgb(7, 17, 27)
        .favorite
          position: absolute
          width: 50px
          right: 11px
          top: 18px
          text-align: center
          .icon-favorite
            font-size: 24px
            line-height: 10px
            color: #d4d6d9
            &.active
              color: rgb(240, 20, 20)
          .text
            display: block
            margin-top: 4px
            font-size: 10px
            line-height: 10px
            color: rgb(77, 85, 93)
      .bulletin
        padding: 18px 18px 0
        .name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .content-wepper
          padding: 8px 12px 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .content
            font-size: 12px
            font-weight: 200
            line-height: 24px
            color: rgb(240, 20, 20)
        .supports
          .support-item
            padding: 16px 12px
            &.support-item:not(:last-child)
              border-1px(rgba(7, 17, 27, 0.1))
            .icon
              margin-right: 6px
            .text
              font-size: 12px
              line-height: 16px
              font-weight: 12px
              font-weight: 200
      .pics
        padding: 18px
        .name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .content
          overflow: hidden
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
      .info
        padding: 18px 18px 0
        .name
          display: block
          padding-bottom: 8px
          font-size: 14px
          line-height: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
        .info-item
          padding: 16px 12px
          font-size: 12px
          font-weight: 200
          line-height: 16px
          &:not(:last-child)
            border-1px(rgba(7, 17, 27, 0.1))

</style>
