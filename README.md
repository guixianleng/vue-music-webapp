# Vue全家桶 简易版QQ音乐webApp

## 项目查看运行：
```shell
$ git clone https://gitee.com/LenGxinLove/vue-music-webapp.git
$ cd vue-music-webapp
$ npm install

$ npm run serve
```

## 功能：
- [x] 推荐
  - [x] 专辑歌曲列表
  - [ ] 专辑详情
- [x] 排行榜
  - [ ] 排行榜详情
- [ ] 歌手
  - [ ] 列表
  - [ ] 条件搜索
- [ ] 搜索功能
  - [ ] 热门搜索
  - [ ] 自定义搜索
- [ ] 播放器
  - [ ] 迷你播放器
  - [ ] 歌曲列表
  - [ ] 歌曲播放模式
  - [ ] 上一首
  - [ ] 下一首
  - [ ] 暂停
  - [ ] 进度条
- [ ] 换肤

## 功能演示：

## 功能实现介绍：
### 1. better-scroll移动端scroll神器
```html
<template>
  <div ref='scroll' class="scroll-view">
    <div>
      <Loading :show="downLoading" />
      <slot></slot>
      <Loading :show="upLoading" />
    </div>
  </div>
</template>
```
```js
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
    upLoading: { // 开启下拉loading
      type: Boolean,
      default: false
    },
    downLoading: { // 开启上拉loading
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
```
```css
<style lang="less">
  .scroll-view {
    height: 100%;
    overflow: hidden;
  }
</style>
```

### 2. Animate.css动画库引入使用
```shell
 yarn add animate.css
```
在`main.js`引入
```js
import animated from 'animate.css'

Vue.use(animated)
```
页面使用示例：
```html
<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="loading" v-if="show">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>{{title}}</span>
    </div>
  </transition>
</template>
```
*注意*：不要忘记`v-if`，不然看不出效果的哦！

### 3. loading加载动画
效果：

```html
<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="loading" v-if="show">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>{{title}}</span>
    </div>
  </transition>
</template>
```

```js
<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '拼命加载中...'
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```
```css
<style lang="less">
@import "~assets/style/variable";
.loading {
  height: 10px;
  width: 120px;
  margin: auto;
  text-align: center;
  font-size: 10px;
  padding: 10px 0;
  > div {
    display: inline-block;
    background-color: @color-theme;
    height: 100%;
    width: 2px;
    margin-right: 4px;
    animation: Dance 1s infinite;
    &:nth-child(2) {
      animation-delay: -0.4s;
    }
    &:nth-child(3) {
      animation-delay: -0.6s;
    }
    &:nth-child(4) {
      animation-delay: -0.5s;
    }
    &:nth-child(5) {
      animation-delay: -0.2s;
    }
  }
}

@keyframes Dance {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
  20% {
    transform: scaleY(1.2);
  }
}
</style>
```