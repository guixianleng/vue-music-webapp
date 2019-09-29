<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style scoped lang="less">
@import "~assets/style/variable";
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: @background-color;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: -5px;
      color: @text-color;
      display: inline-block;
      width: 100%;
    }
    &.router-link-active {
      .tab-link {
        color: @color-theme;
        border-bottom: 2px solid @color-theme;
      }
    }
  }
}
</style>
