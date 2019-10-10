<template>
  <div ref='scroll' class="scroll-view">
    <div>
      <Loading :show="downLoading && pullDown" />
      <slot></slot>
      <Loading :show="upLoading && pullUp" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Loading from 'baseUI/Loading'
// import { debounce } from 'utils'

export default {
  name: 'Scroll',
  components: {
    Loading
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: { // 监听滚动事件
      type: Boolean,
      default: false
    },
    pullUp: { // 开启上拉事件
      type: Boolean,
      default: false
    },
    pullDown: { // 开启下拉事件
      type: Boolean,
      default: false
    },
    bounceTop: { // 允许下拉
      type: Boolean,
      default: true
    },
    bounceBottom: { // 允许上拉
      type: Boolean,
      default: true
    },
    downLoading: { // 开启上拉loading
      type: Boolean,
      default: false
    },
    upLoading: { // 开启下拉loading
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    this._initScroll()
  },
  methods: {
    _initScroll () {
      // Options 参数
      const { probeType, click, bounceTop, bounceBottom } = this.$props
      // Events 事件
      const { listenScroll, pullUp, pullDown } = this.$props

      if (!this.$refs.scroll) return
      this.bScroll = new BScroll(this.$refs.scroll, {
        probeType: probeType,
        click: click,
        stopPropagation: true,
        // 是否启用上下拉效果
        bounce: {
          top: bounceTop,
          bottom: bounceBottom
        }
      })
      // 监听滚动事件
      if (listenScroll) {
        this.bScroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      // 触底事件
      if (pullUp) {
        this.bScroll.on('scrollEnd', () => {
          if (this.bScroll.y <= (this.bScroll.maxScrollY + 50)) {
            // debounce(() => {
            //   this.$emit('pullUp')
            // }, 200)
            this.$emit('pullUp')
          }
        })
      }
      // 上拉事件
      if (pullDown) {
        this.bScroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            // debounce(() => {
            //   this.$emit('pullDown')
            // }, 200)
            this.$emit('pullDown')
          }
        })
      }
    },
    refresh () {
      this.bScroll && this.bScroll.refresh()
    },
    scrollTo () {
      this.bScroll && this.bScroll.scrollTo.apply(this.bScroll, arguments)
    },
    scrollToElement () {
      this.bScroll && this.bScroll.scrollToElement.apply(this.bScroll, arguments)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="less">
  .scroll-view {
    height: 100%;
    overflow: hidden;
  }
</style>
