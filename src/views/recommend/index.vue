<template>
  <div class="recommend">
    <Scroll
      @scroll="handleScroll"
      listenScroll
      pullUp
      @pullUp="handlePullUp"
    >
      <div class="slider-wrapper" v-if="sliderList.length">
        <!-- 轮播组件 -->
        <Slider>
          <div v-for="(item, index) in sliderList" :key="index">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </Slider>
      </div>
      <!-- 推荐列表 -->
      <div class="recommend-list">
        <h1 class="recommend-list__title">歌单推荐</h1>
        <ul>
          <li :key="item.id" v-for="item in discList" class="recommend-list__item">
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
  </div>
</template>

<script>
import Slider from 'baseUI/Slider'
import Scroll from 'baseUI/Scroll'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  name: 'recommend',
  components: {
    Slider,
    Scroll
  },
  data () {
    return {
      sliderList: [], // 推荐轮播图
      discList: [] // 专辑列表
    }
  },
  created () {
    this.handleGetSilder()
    this.handleGetList()
  },
  methods: {
    handleScroll (pos) {
      console.log(pos)
    },
    handlePullUp () {
      console.log('上拉')
    },
    handleGetSilder () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.sliderList = res.data.slider
        }
      })
    },
    handleGetList () {
      getDiscList().then((res) => {
        this.discList = res.data.list
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/style/variable';
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
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
      padding: 0 20px 20px 20px;
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
          color: #333;
        }
        .desc {
          color: #666;
        }
      }
    }
  }
}
</style>
