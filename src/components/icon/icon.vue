<template>
  <span class="icon" :class="itemClass"></span>
</template>

<script type="text/ecmascript-6">
export default {
  created () {
    this.classMaps = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  props: {
    itemType: Number,
    size: Number
  },
  computed: {
    itemClass: function() {
      let type = ''
      let icon = 'icon-'
      if (this.size === 16) {
        // 16px
        type = 2
        icon = icon + '16'
      } else if (this.size === 312) {
        type = 3
        icon = icon + '312'
      } else if (this.size === 316) {
        type = 3
        icon = icon + '316'
      } else {
        // 默认12px
        icon = icon + '12'
      }
      return icon + ' ' + this.classMaps[this.itemType] + type
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'
  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
  .icon-12
    width: 12px
    height: 12px
    margin-right: 4px
    background-size: 12px 12px
  .icon-312
    width: 12px
    height: 12px
    background-size: 12px 12px
  .icon-316
    width: 16px
    height: 16px
    background-size: 16px 16px
  .icon-16
    width: 16px
    height: 16px
    margin-right: 6px
    background-size: 16px 16px

  .decrease
    bg-image('decrease_1')
  .discount
    bg-image('discount_1')
  .guarantee
    bg-image('guarantee_1')
  .invoice
    bg-image('invoice_1')
  .special
    bg-image('special_1')

  .decrease2
    bg-image('decrease_2')
  .discount2
    bg-image('discount_2')
  .guarantee2
    bg-image('guarantee_2')
  .invoice2
    bg-image('invoice_2')
  .special2
    bg-image('special_2')

  .decrease3
    bg-image('decrease_3')
  .discount3
    bg-image('discount_3')
  .guarantee3
    bg-image('guarantee_3')
  .invoice3
    bg-image('invoice_3')
  .special3
    bg-image('special_3')
</style>
