<template>
  <div class="list-view">
    <scroll
      ref="listview"
      :probe-type="probeType"
      @scroll="scroll"
      listen-scroll
    >
      <ul>
        <li
          class="list-group"
          v-for="group in data"
          ref="listGroup"
          :key="group.id"
        >
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li
              @click="selectItem(item)"
              class="list-group-item"
              v-for="item in group.items"
              :key="item.id"
            >
              <img v-lazy="item.avatar" alt class="avatar" />
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          class="item"
          :class="{'current': currentIndex === index}"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
    <loading v-show="!data.length" middle></loading>
  </div>
</template>

<script>
import Scroll from 'baseUI/Scroll'
import Loading from 'baseUI/Loading_2'
import { getData } from 'utils/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 15

export default {
  name: 'Singer',
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortcutList () {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.probeType = 3
      this.touch = {}
      this.listHeight = []
    },
    selectItem (item) { // 点击歌手详情
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) { // 开始滑动
      let anchorIndex = getData(e.target, 'index') // 获取字母
      let firstTouch = e.touches[0] // 初始位置
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove (e) { // 滑动中
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    scroll (pos) { // 滚动的y轴大小
      this.scrollY = pos.y
    },
    _calculateHeight () { // 计算shortcut高度
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // 手动改变this.scrollY值，让右侧字母高亮
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) { // 滚动更改字母显示
      let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/style/variable";
.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  .list-group {
    padding-bottom: 30px;
    &-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @fs-small;
      color: var(--text-color);
      background: var(--shortcut-color);
    }
    &-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: var(--text-color);
        font-size: @fs-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: var(--shortcut-color);
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: var(--text-color);
      font-size: @fs-small;
      &.current {
        color: var(--theme-color);
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @fs-small;
      color: var(--text-color);
      background: var(--shortcut-color);
    }
  }
}
</style>
