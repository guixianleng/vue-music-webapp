<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
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
@import "~assets/style/theme";
.tab {
  display: flex;
  height: 40px;
  line-height: 37px;
  font-size: @fs-medium-x;
  background-color: var(--bg-color);
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      color: var(--text-color);
      display: inline-block;
      width: 100%;
    }
    &.router-link-active {
      .tab-link {
        color: var(--theme-color);
        border-bottom: 2px solid var(--theme-color);
      }
    }
  }
}
</style>
