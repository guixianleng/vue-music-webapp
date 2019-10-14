<template>
  <div :class="{'loading-2': true, }">
    <div :class="{'loading-2--content': middle}"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading_2',
  props: {
    middle: { // 居中
      type: Boolean,
      default: false
    },
    top: { // 上方
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/theme';
.loading-2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, .3);
  > div {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgba(0, 169, 178,.2);
    &::before {
      content: "";
      width: 70px; // 50 * √2
      height: 70px; // 50 * √2
      background-color: var(--theme-color);
      position: absolute;
      left: 50%;
      bottom: 50%;
      z-index: 1;
      transform-origin: left bottom;
      animation: rotate 1.5s infinite linear;
    }
    &::after {
      content: "";
      width: 40px;
      height: 40px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: #fff;
      z-index: 2;
      border-radius: 50%;
    }
  }
  &--content {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
