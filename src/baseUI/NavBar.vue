<template>
  <div class="nav-bar">
    <div class="nav-bar--left" @click="handleLeft">
      <i
        class="iconfont"
        :style="{'display': leftArrow ? '' : 'none'}"
      >
        &#xeb15;
      </i>
      <span>{{leftText ? leftText : ''}}</span>
    </div>
    <div class="nav-bar--title">{{title}}</div>
    <div
      class="nav-bar--right"
      @click="handleRight"
    >
      <slot name="right" v-if="$slots.right"></slot>
      <span v-else>{{rightText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav-bar',
  props: {
    leftArrow: { // 左侧箭头
      type: Boolean,
      default: false
    },
    leftText: { // 左侧文案
      type: String,
      default: ''
    },
    title: { // 标题
      type: String,
      default: ''
    },
    rightText: { // 右侧文案
      type: String,
      default: ''
    }
  },
  methods: {
    handleLeft () {
      this.$emit('click-left')
    },
    handleRight () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/style/variable";
@import "~assets/style/mixin";
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: @text-color;
  font-size: 14px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 15px;
  z-index: 99;
  background-color: @color-background-d;
  &--left,
  &--right {
    font-size: 14px;
    color: @color-white;
    .iconfont {
      font-size: 16px;
      vertical-align: middle
    }
  }
  &--title {
    .ellipsis();
    max-width: 60%;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
