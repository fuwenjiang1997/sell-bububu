<template>
<div class="ratings" ref="ratingsScroll">
  <div class="ratings-content">
    <div class="rating-"></div>
    <div class="score-wrapper">
      <div class="score">
        <div class="score-num">{{seller.score}}</div>
        <div class="com-score">综合评分</div>
        <div class="extra">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="score-star">
        <div class="service-swepper">
          <h2 class="service-title">商品评分</h2>
          <Star
            :size=24
            :score="seller.foodScore"
            class="star"
          />
          <div class="score-right">{{seller.score}}</div>
        </div>
        <div class="service-swepper">
          <h2 class="service-title">服务态度</h2>
          <Star
            :size=24
            :score="seller.serviceScore"
            class="star"
          />
          <div class="score-right">{{seller.serviceScore}}</div>
        </div>
        <div class="service-swepper">
          <h2 class="service-title">送达时间</h2>
          <div class="delivery-time">{{seller.deliveryTime}}分钟</div>
        </div>
      </div>
    </div>
    <SpliceLine />
    <RatingSelect
      @select="selectRating"
      @toggle="toggleContent"
      :selectType="selectType"
      :onlyContent="onlyContent"
      :ratings="ratings"
      class="rating-region"
    />
    <div class="content-wepper">
      <ul class="list-ratings">
        <li
          v-show="needShow(rating.rateType, rating.text)"
          v-for="(rating, index) in ratings"
          :key="index"
          class="rating-content"
        >
          <div class="avatar"><img :src="rating.avatar" alt=""></div>
          <div class="content">
            <div class="content-header">
              <span class="name">{{rating.username}}</span>
              <span class="time">{{rating.rateTime | formatDate}}</span>
            </div>
            <div class="content-star">
              <Star class="star" :size=36 :score="rating.score" />
              <span class="delivery-time">{{rating.deliveryTime? rating.deliveryTime + '分钟送达' : ''}}</span>
            </div>
            <span class="text">{{rating.text}}</span>
            <div class="recommend">
              <span v-if="rating.rateType === 0" class="icon-thumb_up"></span>
              <span v-else class="icon-thumb_down"></span>
              <div class="flex-recommend">
                <span class="list-recommend" v-for="(recommend,index) in rating.recommend" :key="index">{{recommend}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Star from 'components/star/star'
import SpliceLine from 'components/spliceline/spliceline'
import RatingSelect from 'components/ratingselect/ratingselect'
import { formatDate } from 'common/js/date'
import BScroll from '@better-scroll/core'

const ERR_OK = 0
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    }
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    _inintScroll: function() {
      if (!this.ratingScroll) {
        this.$nextTick(() => {
          this.ratingScroll = new BScroll(this.$refs.ratingsScroll, {
            click: true
          })
        })
      }
    },
    needShow: function (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    },
    selectRating: function (type) {
      this.selectType = type
      this.ratingScroll.refresh()
    },
    toggleContent: function () {
      this.onlyContent = !this.onlyContent
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created() {
    this.$http.get('http://selladmin.bfclouds.cn/ratings.php', {}, { emulateJSON: true }).then((res) => {
      res = res.body
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        this._inintScroll()
      }
    }).catch((res) => {
      this.ratings = []
    })
  },
  components: {
    Star,
    SpliceLine,
    RatingSelect
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'

  .ratings
    position: absolute
    top: 174px
    // bottom: 46px
    bottom: 0
    width: 100%
    overflow: hidden
    .score-wrapper
      display: flex
      padding: 18px 0
      .score
        flex: 0 1 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .score-num
          margin-bottom: 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .com-score
          margin-bottom: 8px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
        .extra
          margin-bottom: 6px
          font-size: 10px
          line-height: 10px
          color: rgba(7, 17, 27, 0.5)
      .score-star
        flex: 1
        margin: 0 24px
        .service-swepper
          font-size: 12px
          .service-title
            display: inline-block
            margin-right: 12px
          .star
            display: inline
            margin-right: 12px
          .score-right
            display: inline-block
            line-height: 18px
            color: rgb(255, 153, 0)
          .delivery-time
            display: inline
            color: rgb(147, 153, 159)
        .service-swepper:not(:last-child)
            margin-bottom: 8px
    .rating-region
      margin: 18px 24px
    .content-wepper
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      .list-ratings
        padding: 0 18px
        .rating-content
          display: flex
          margin-top: 18px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .avatar
            flex: 0 1 28px
            margin-right: 12px
            width: 28px
            height: 28px
            border-radius: 50%
            overflow: hidden
            img
              width: 100%
          .content
            flex: 1
            font-size: 10px
            line-height: 12px
            .content-header
              .name
                display: inline-block
                color: rgb(7, 17, 27)
              .time
                display: inline-block
                float: right
                font-weight: 200
                color: rgb(147, 153, 159)
            .content-star
              .star
                display: inline-block
                margin: 4px 6px 0 0
              .delivery-time
                display: inline-block
                font-size: 10px
                line-height: 12px
                font-weight: 100
                color: rgb(147, 153, 159)
            .text
              display: block
              margin-top: 6px
              font-size: 12px
              line-height: 18px
              color: rgb(7, 17, 27)
            .recommend
              display: flex
              margin-top: 8px
              margin-bottom: 18px
              font-size: 12px
              line-height: 16px
              .icon-thumb_up
                flex: 0 1 20px
                color: rgb(0, 160, 220)
              .icon-thumb_down
                flex: 0 1 20px
                color: rgb(183, 187, 191)
              .flex-recommend
                display: flex
                flex-wrap: wrap
                .list-recommend
                  margin: 0 8px 8px
                  padding: 0 6px
                  min-width: 0
                  font-size: 9px
                  line-height: 16px
                  text-align: center
                  text-overflow: ellipsis
                  color: rgb(147, 153, 159)
                  border: 1px solid rgba(7, 17, 27, 0.1)
                  border-radius: 2px

</style>
