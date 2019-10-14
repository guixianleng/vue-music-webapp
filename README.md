# Vue全家桶 简易版QQ音乐webApp

## 项目查看运行：
### 1. 克隆项目并安装依赖
```shell
$ git clone https://gitee.com/LenGxinLove/vue-music-webapp.git
$ cd vue-music-webapp
$ npm install
```
### 2. 运行api接口
```shell
$ cd ./server

$ node app
```
### 3.预览项目：
```shell
$ npm run serve
```

## 功能：
- [x] 推荐
  - [x] 专辑歌曲列表
  - [ ] 专辑详情
- [x] 排行榜
  - [ ] 排行榜详情
- [x] 歌手
  - [x] 列表
  - [x] 字母筛选
  - [ ] 歌手详情
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
- [x] 换肤

## 功能演示：
### 1. 换肤
![](https://raw.githubusercontent.com/guixianleng/images-store/master/images/change-skin.gif)

## 功能实现介绍：

### 1. 换肤功能
换肤是`基于css自定义变量`来实现的

css自定义变量拥有像less/sass那种定义变量并使用变量的能力，声明变量的时候，变量名前面要加两根连词线（--），在使用的时候只需要使用var()来访问即可
```css
@import url('./variable.less');
body {
  --theme-color: @color-theme;
  --theme-bg-color: @color-theme;
  --bg-color: @background-color;
  --shortcut-color: @background-shortcut-color;
  --text-color: @text-color;
}
```
如果要局部使用，只需要将变量定义在元素选择器内部即可。具体使用详见[使用CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

使用 `css 自定义变量` 的好处就是我们可以使用 `js` 来改变这个变量：
- document.body.style.setProperty('--primary', '#31C27C') --> 设置变量
- document.body.style.getPropertyValue('--primary') --> 获取变量
- document.body.style.removeProperty('--primary') --> 删除变量

```js
// 换肤
document.body.style.setProperty('--theme-color', skin.name === '炫酷黑' ? '#B82525' : skin.color)
document.body.style.setProperty('--theme-bg-color', skin.color)
document.body.style.setProperty('--bg-color', skin.name === '炫酷黑' ? skin.color : '#fff')
document.body.style.setProperty('--shortcut-color', skin.name === '炫酷黑' ? '#333' : '#f2f3f4')
document.body.style.setProperty('--text-color', skin.name === '炫酷黑' ? '#FFF' : '#333')
```

### 2. better-scroll移动端scroll神器
```js
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

<style lang="less">
  .scroll-view {
    height: 100%;
    overflow: hidden;
  }
</style>
```

### 3. Animate.css动画库引入使用
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

### 5. loading加载动画
```js
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
    background-color: var(--theme-bg-color);
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