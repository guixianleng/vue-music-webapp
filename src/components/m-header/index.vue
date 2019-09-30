<template>
  <div class="m-header">
    <div class="mine" @click="handleShowSkin">
      <i class="iconfont icon-mine">&#xe610;</i>
    </div>
    <div class="logo"></div>
    <h1 class="text">Vue Music</h1>
    <Menu @close="handleClose" :show="isSkin" />
  </div>
</template>

<script>
import Menu from '../menu'

export default {
  name: 'M-header',
  components: {
    Menu
  },
  data () {
    return {
      isSkin: false
    }
  },
  methods: {
    handleShowSkin () {
      this.isSkin = true
    },
    handleClose () {
      this.isSkin = false
    }
  }
}
</script>

<style scoped lang="less">
  @import "~assets/style/variable";
  .m-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: @color-white;
    font-size: 0;
    background-color: @color-theme;
    .logo {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      background-image: url('../../assets/images/logo.png');
      background-size: 37px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: 18px;
    }
    .mine {
      position: absolute;
      top: 0;
      left: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: @color-white;
      }
    }
  }
</style>
