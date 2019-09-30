<template>
  <div>
    <transition
      name="skin-transition"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      :duration="{ enter: 1000, leave: 500 }"
    >
      <div class="menu-center" v-if="show">
        <div class="footer">
          <div @click="handleCenter">
            皮肤中心
          </div>
          <div class="footer--close" @click="handleClose">
            关闭
          </div>
        </div>
      </div>
    </transition>
    <Skin :show="showSkin" />
  </div>
</template>

<script>
import Skin from './Skin'

export default {
  name: 'Menu',
  components: {
    Skin
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showSkin: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    handleCenter () {
      this.showSkin = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable';
.menu-center {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @color-background-d;
  z-index: 99;
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #333;
    background-color: #EEE;
    div {
      height: 40px;
      line-height: 40px;
      background-color: #FFFFFF;
    }
    &--close {
      margin-top: 10px
    }
  }
}
</style>
