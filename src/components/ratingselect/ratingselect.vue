<template>
<div class="ratingselect">
  <div class="rating-type">
    <span @click="select(2, $event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span
          class="count">{{ratings.length}}</span></span>
    <span @click="select(0, $event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span
          class="count">{{positives.length}}</span></span>
    <span @click="select(1, $event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span
          class="count">{{negatives.length}}</span></span>
  </div>
  <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
    <span class="icon-check_circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      default() {
        return ALL
      }
    },
    onlyContent: {
      type: Boolean,
      default() {
        return false
      }
    },
    ratings: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    select: function (type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    },
    toggleContent: function () {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  },
  computed: {
    positives: function () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives: function () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'
  .ratingselect
    .rating-type
      padding-bottom:18px
      color: rgb(77, 85, 93)
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        padding: 8px 12px
        margin-right: 8px
        font-size: 12px
        line-height: 16px
        border-radius: 2px
      // .all
      //   color: #fff
      //   background: rgb(0, 160, 220, 0.2)
      .positive
        background: rgba(0, 160, 220, 0.2)
      .negative
        background: rgba(77, 85, 93, 0.2)
      .active
        color: #fff
        background: rgb(0,160,220)
    .switch
      margin: 12px
      color: rgb(147, 153, 159)
      line-height: 24px
      .icon-check_circle
        vertical-align: top
        font-size: 24px
        margin-right: 4px
      .text
        vertical-align: top
        font-size: 12px
    .on
      .icon-check_circle
        color: #00c850
</style>
