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
@import "~assets/style/theme";
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
