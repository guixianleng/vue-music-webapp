<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{active: currentIndex === index}">
      </div>
    </div>
  </div>
</template>

<script>
import { addClass } from 'utils/dom'
import BScroll from 'better-scroll'

export default {
  name: 'Slider',
  props: {
    loop: { // 循环播放
      type: Boolean,
      default: true
    },
    autoPlay: { // 自动播放
      type: Boolean,
      default: true
    },
    interval: { // 播放间隔
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  mounted () {
    this._initSliderWidth()
    this._initDots()
    this._initSlider()
    if (this.autoPlay) {
      this.handlePlay()
    }
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._initSliderWidth(true)
    })
  },
  methods: {
    // 初始化宽度
    _initSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化dot
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    // 初始化Slider
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentIndex = pageIndex
        if (this.autoPlay) {
          this.handlePlay()
        }
      })
    },
    // 自动播放下一张
    handlePlay () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="less">
@import '~assets/style/variable';
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: @color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: @color-theme;
      }
    }
  }
}
</style>
