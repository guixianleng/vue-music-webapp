<template>
  <div id="app">
    <m-header />
    <Tab />
    <router-view />
  </div>
</template>

<script>
import MHeader from 'components/m-header'
import Tab from 'components/tab'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="less">
#app {
  font-size: 16px;
}
</style>
