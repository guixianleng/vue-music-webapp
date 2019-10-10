<template>
  <transition
    enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown"
  >
    <div class="skin" v-if="show">
      <nav-bar
        title="皮肤中心"
        right-text="取消"
        @click-right="onClickRight"
      />
      <div class="container">
        <h1>主题</h1>
        <div class="skins">
          <div class="skins-item" v-for="skin in skins" :key="skin.key" @click="handleCurrentTheme(skin.key)">
            <div
              class="skins-color"
              :style="{ 'background-color': skin.color, 'box-shadow': `0 0 1px ${skin.color}` }"
            >
              <i
                class="iconfont icon-right"
                v-show="skin.key === currentTheme"
              >&#xe648;</i>
            </div>
            <span>{{skin.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import NavBar from 'baseUI/NavBar'

export default {
  name: 'Skin',
  components: {
    NavBar
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentTheme: 'qqGreen',
      skins: [
        { key: 'mangoYellow', name: '芒果黄', color: '#FFA500' },
        { key: 'coolBlack', name: '炫酷黑', color: '#212121' },
        { key: 'kuGouBlue', name: '酷狗蓝', color: '#2CA2F9' },
        { key: 'netBaseRed', name: '网易红', color: '#D43C33' },
        { key: 'qqGreen', name: 'QQ绿', color: '#31C27C' },
        { key: 'lovelyPink', name: '芭比粉', color: '#FF7A9E' },
        { key: 'gold', name: '暗金', color: '#9B7300' }
      ]
    }
  },
  methods: {
    onClickRight () {
      this.$emit('close', false)
    },
    handleCurrentTheme (theme) {
      this.currentTheme = theme
      setTimeout(() => {
        this.$emit('close', false)
      }, 20)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/style/variable";
.skin {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../../assets/images/skin_bg.jpg') no-repeat center;
  background-size: cover;
  z-index: 100;
  .container {
    margin-top: 65px;
    h1 {
      color: #FFF;
      font-weight: 500;
      font-size: 16px;
      margin-left: 15px;
      margin-top: 20px;
      text-align: left;
    }
  }
  .skins {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin-top: 20px;
    &-item {
      flex: 0 0 20%;
      text-align: center;
      margin-left: 4%;
      margin-bottom: 15px;
      box-sizing: border-box;
    }
    &-color {
      padding-bottom: 110%;
      margin-bottom: 10px;
      position: relative;
      .icon-right {
        position: absolute;
        right: 5px;
        bottom: 5px;
        font-size: 18px;
      }
    }
  }
}
</style>
