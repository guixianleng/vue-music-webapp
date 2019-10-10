<template>
  <div>
    <!-- <transition
      enter-active-class="animated rotateInDownLeft"
      leave-active-class="animated fadeOutDown"
      :duration="{ enter: 1000, leave: 500 }"
    > -->
    <transition name="page">
      <div class="menu-center" v-if="show">
        <div class="menu-center--blank" @click="handleClose"></div>
        <div class="menu-center--footer">
          <div @click="handleCenter">
            皮肤中心
          </div>
          <div class="menu-center--footer__close" @click="handleClose">
            关闭
          </div>
        </div>
      </div>
    </transition>
    <Skin :show="showSkin" @close="hanldeCloseSkin" />
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
    handleClose () { // 关闭菜单
      this.$emit('close')
    },
    handleCenter () { // 显示皮肤中心并关闭菜单
      this.showSkin = true
      this.$emit('close')
    },
    hanldeCloseSkin (params) { // 关闭皮肤中心
      this.showSkin = params
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
  &--blank {
    width: 100%;
    height: 100%;
  }
  &--footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    z-index: 100;
    color: #333;
    background-color: #EEE;
    > div {
      height: 40px;
      line-height: 40px;
      background-color: #FFFFFF;
    }
    &__close {
      margin-top: 10px
    }
  }
}
</style>
