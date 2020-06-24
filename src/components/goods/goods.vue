<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index" class="menu-item"
          :class="{'current': currentIndex === index}"
          @click="selectMenu(index, $event)"
        >
          <span class="text">
            <Icon
              v-show="item.type > 0"
              :itemType = "item.type"
              :size = "312"
            ></Icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(good, index) in goods" :key=index class="food-list-hook">
          <ul>
            <span class="item-title">{{good.name}}</span>
            <li
              v-for="(item, i) in good.foods"
              :key=i class="food-item"
            >
              <div class="content-swipper" @click.stop="selectFood(item, $event)">
                <div class="icon">
                  <img width="57px" height="57px" :src="item.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{item.sellCount}}份</span>
                    <span>好评率{{item.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="new-price">￥{{item.price}}</span>
                    <span v-show="good.oldPrice" class="old-price">￥{{good.oldPrice}}</span>
                  </div>
                </div>
              </div>
              <!-- 增加减少控件 -->
              <div class="cartcontrol-wrapper">
                <CartControl
                  :food="item"
                >
                </CartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShoopCart
      :deliveryPri="seller.deliveryPrice"
      :minPri="seller.minPrice"
      :selectFoods="selectFoods"
    ></ShoopCart>
    <Food
      :food="selectedFood"
      ref="food"
    ></Food>
  </div>
</template>

<script type="text/ecmascript-6">
import Icon from 'components/icon/icon.vue'
import ShoopCart from 'components/shoopcart/shoopcart.vue'
import CartControl from 'components/cartcontrol/cartcontrol.vue'
import Food from 'components/food/food.vue'
import BScroll from '@better-scroll/core'

const ERRNO_OK = 0

export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  props: {
    seller: Object
  },
  methods: {
    _initScroll: function() {
      // 获取到这个food-wrapper dom
      this.meunScrll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScrll = new BScroll(this.$refs.foodsWrapper, {
        // 会阻止默认行为，需要设置
        click: true,
        // 监听scroll
        probeType: 3
      })
      this.foodsScrll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 每个类型的高度
    _calculateHeight: function() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      // console.log(foodList)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu: function (index, event) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScrll.scrollToElement(el, 300)
      this.scrollY = Math.abs(this.listHeight[index])
    },
    selectFood: function (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    }
  },
  computed: {
    currentIndex: function () {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods: function() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.$http.get('http://selladmin.bfclouds.cn/goods.php', {}, { emulateJSON: true }).then((res) => {
      res = res.body
      if (res.errno === ERRNO_OK) {
        this.goods = res.data
        // 处理DOM时一定要保证dom已经渲染
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    }).catch((res) => {
      this.goods = []
    })
  },
  components: {
    Icon,
    ShoopCart,
    CartControl,
    Food
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      display: flex
      flex: 0 0 80px  //等分 缩放 占位空间
      width: 80px
      background-color: #f3f5f7
      flex-flow: column wrap
      .menu-item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px
        font-weight: 200
        &.current
          position: relative
          font-size: 12px
          margin-top: -1px
          line-height: 14px
          background: #fff
          font-weight: 700
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, .1))
          font-size: 12px

    .foods-wrapper
      flex: 1
      .item-title
        display: block
        width: 100%
        height: 26px
        padding-left: 14px
        border-left: 2px solid #d9dde1
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .food-item
        display: flex
        margin: 18px 18px 0
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        .content-swipper
          width: 100%
          &:last-child:after
            display: none
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            display: inline-block
            flex: 1
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7,1 17, 27)
            .desc
              margin: 8px 0
              font-size: 10px
              line-height: 14px
              color: rgb(147, 153, 159)
              text-overflow: ellipsis
            .extra
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
              .count
                margin-right: 12px
            .price
              .new-price
                font-size: 14px
                color: rgb(240,20,20)
                font-weight: 300
                line-height: 24px
              .old-price
                font-size: 10px
                color: rgb(147, 153, 159)
                font-weight: 300
                text-decoration: line-through
        .cartcontrol-wrapper
          position: absolute
          bottom: 10px
          right: 0px

</style>
