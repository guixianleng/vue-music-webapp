<template>
  <div class="recommend">
    <scroll
      :upLoading="isupLoading"
      pullUp
      @pullUp="handlePullUp"
    >
      <div class="slider-wrapper" v-if="sliderList.length">
        <!-- 轮播组件 -->
        <slider>
          <div v-for="(item, index) in sliderList" :key="index">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <!-- 推荐列表 -->
      <div class="recommend-list" v-if="discList.length">
        <h1 class="recommend-list__title">歌单推荐</h1>
        <ul>
          <li :key="item.id" v-for="item in discList" class="recommend-list__item" @click="handleRecDetail(item)">
            <div class="icon">
              <!-- @error="(e) => {e.currentTarget.src = require('../../assets/images/default.png')}" -->
              <img
                width="60"
                height="60"
                v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name">{{item.creator.name}}</h2>
              <p class="desc">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <!-- 加载状态 -->
    <loading v-show="!discList.length" middle></loading>
  </div>
</template>

<script>
import Slider from 'baseUI/Slider'
import Scroll from 'baseUI/Scroll'
import Loading from 'baseUI/Loading_2'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  name: 'recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      isupLoading: false, // 开启上拉loading
      sliderList: [], // 推荐轮播图
      discList: [] // 专辑列表
    }
  },
  created () {
    this.handleGetSilder()
    this.handleGetList()
  },
  methods: {
    handlePullUp () { // 上拉事件处理
      this.isupLoading = true
      console.log('上拉')
      setTimeout(() => {
        this.isupLoading = false
      }, 500)
    },
    handleGetSilder () { // 获取轮播列表
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider
        }
      })
    },
    handleGetList () { // 获取推荐列表
      getDiscList().then((res) => {
        this.discList = res.data.list
      })
    },
    handleRecDetail (item) { // 跳转至详情
      this.$router.push({ path: `/recommend/${item.dissid}` })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/theme';
@import '~assets/style/mixin';
.recommend {
  .pos-fixed();
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  &-list {
    &__title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: @fs-medium-x;
      color: @color-theme;
    }
    &__item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 10px 20px;
      .icon {
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
        img {
          border-radius: 4px;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: @fs-medium;
        .name {
          margin-bottom: 8px;
          color: var(--text-color);
        }
        .desc {
          color: #666;
        }
      }
    }
  }
}
</style>
